const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const REPO_DIR = path.join(ROOT_DIR, 'vietri-repo');

// Paths
const STYLE_PATH = path.join(REPO_DIR, 'style.css');
const SCRIPT_PATH = path.join(REPO_DIR, 'script.js');

// Read Content
let css = fs.readFileSync(STYLE_PATH, 'utf8');
let js = fs.readFileSync(SCRIPT_PATH, 'utf8');

function generateHTML(isRoot) {
    const previewPath = isRoot ? 'vietri-repo/preview.jpg' : 'preview.jpg';

    // Fix link for rules.html
    // If isRoot (portable.html), link to 'vietri-repo/rules.html'
    // If in repo (index.html), link to 'rules.html' (relative)
    let injectedJs = js;
    if (isRoot) {
        // We use a regex to safe replace the href
        injectedJs = injectedJs.replace(/href="rules\.html"/g, 'href="vietri-repo/rules.html"');
    }

    // We build array to avoid backtick issues in template string
    const parts = [];
    parts.push(`<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vietri: Maestri della Ceramica</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏺</text></svg>">
    
    <!-- Meta Tags -->
    <meta property="og:title" content="Vietri: Maestri della Ceramica" />
    <meta property="og:description" content="Diventa un Maestro Artigiano nella Costiera Amalfitana. Gioca ora!" />
    <meta property="og:image" content="${previewPath}" />
    <meta property="og:type" content="website" />

    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'vietri-blue': '#0047AB',
                        'vietri-yellow': '#FFD700',
                    },
                    fontFamily: {
                        'serif': ['Georgia', 'serif'],
                        'sans': ['"Segoe UI"', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>`);

    parts.push(css);

    parts.push(`    </style>
</head>
<body class="min-h-screen flex flex-col items-center justify-center font-sans">
    <div id="app" class="w-full h-full flex flex-col items-center justify-center"></div>
    <script>`);

    parts.push(injectedJs);

    parts.push(`    </script>
</body>
</html>`);

    return parts.join('\n');
}

// Write Portable
try {
    const portableHTML = generateHTML(true);
    fs.writeFileSync(path.join(ROOT_DIR, 'portable.html'), portableHTML, 'utf8');
    console.log('OK: portable.html created');
} catch (e) {
    console.error('FAIL: portable.html', e);
    process.exit(1);
}

// Write Index
try {
    const indexHTML = generateHTML(false);
    fs.writeFileSync(path.join(REPO_DIR, 'index.html'), indexHTML, 'utf8');
    console.log('OK: vietri-repo/index.html created');
} catch (e) {
    console.error('FAIL: vietri-repo/index.html', e);
    process.exit(1);
}
