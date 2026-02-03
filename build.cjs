const fs = require('fs');
const path = require('path');

// Force CommonJS to avoid "type": "module" issues if present, 
// though we usually run as 'node build.cjs' to be safe.
const ROOT_DIR = __dirname;
const REPO_DIR = path.join(ROOT_DIR, 'vietri-repo');

const STYLE_PATH = path.join(REPO_DIR, 'style.css');
const SCRIPT_PATH = path.join(REPO_DIR, 'script.js');

function build() {
    console.log("Starting build...");

    if (!fs.existsSync(STYLE_PATH) || !fs.existsSync(SCRIPT_PATH)) {
        console.error("Missing source files!");
        process.exit(1);
    }

    const cssContent = fs.readFileSync(STYLE_PATH, 'utf8');
    const jsContent = fs.readFileSync(SCRIPT_PATH, 'utf8');

    // --- Template Parts ---
    const headerPart1 = `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vietri: Maestri della Ceramica</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏺</text></svg>">
    
    <meta property="og:title" content="Vietri: Maestri della Ceramica" />
    <meta property="og:description" content="Diventa un Maestro Artigiano nella Costiera Amalfitana. Gioca ora!" />
`;

    // We accept an image path argument
    const headerPart2 = (imgPath) => `    <meta property="og:image" content="${imgPath}" />
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
    <style>
`;

    const middlePart = `
    </style>
</head>
<body class="min-h-screen flex flex-col items-center justify-center font-sans">
    <div id="app" class="w-full h-full flex flex-col items-center justify-center"></div>
    <script>
`;

    const footerPart = `
    </script>
</body>
</html>`;

    // --- Build Portable (Root) ---
    // Image path relative to root: vietri-repo/preview.jpg
    // Rules link needs to be fixed in JS: 'rules.html' -> 'vietri-repo/rules.html'
    const portableJs = jsContent.replace(/href="rules\.html"/g, 'href="vietri-repo/rules.html"');

    const portableHtml = headerPart1 +
        headerPart2('vietri-repo/preview.jpg') +
        cssContent +
        middlePart +
        portableJs +
        footerPart;

    fs.writeFileSync(path.join(ROOT_DIR, 'portable.html'), portableHtml);
    console.log("Created portable.html");

    // --- Build Repo Index ---
    // Image path relative: preview.jpg
    // Rules link stays 'rules.html'
    const repoHtml = headerPart1 +
        headerPart2('preview.jpg') +
        cssContent +
        middlePart +
        jsContent +
        footerPart;

    fs.writeFileSync(path.join(REPO_DIR, 'index.html'), repoHtml);
    console.log("Created vietri-repo/index.html");
}

build();
