# Build script to generate portable.html and index.html

# Read source files
$css = Get-Content -Path "vietri-repo\style.css" -Raw -Encoding UTF8
$js = Get-Content -Path "vietri-repo\script.js" -Raw -Encoding UTF8

# HTML Template function
function Get-Html {
    param(
        [string]$previewPath,
        [string]$jsContent,
        [boolean]$fixLinks
    )

    $finalJs = $jsContent
    if ($fixLinks) {
        $finalJs = $finalJs -replace 'href="rules.html"', 'href="vietri-repo/rules.html"'
    }

    $template = @"
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vietri: Maestri della Ceramica</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏺</text></svg>">
    
    <!-- Social -->
    <meta property="og:title" content="Vietri: Maestri della Ceramica" />
    <meta property="og:description" content="Diventa un Maestro Artigiano nella Costiera Amalfitana. Gioca ora!" />
    <meta property="og:image" content="$previewPath" />
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
$$css
    </style>
</head>
<body class="min-h-screen flex flex-col items-center justify-center font-sans">
    <div id="app" class="w-full h-full flex flex-col items-center justify-center"></div>
    <script>
$$finalJs
    </script>
</body>
</html>
"@
    return $template
}

# --- BUILD PORTABLE (Root) ---
Write-Host "Building portable.html..."
$portable = Get-Html -previewPath "vietri-repo/preview.jpg" -jsContent $js -fixLinks $true
# Use [IO.File] to write to avoid BOM or encoding issues if possible, but Set-Content is usually fine with -Encoding UTF8
[System.IO.File]::WriteAllText("$PWD/portable.html", $portable)

# --- BUILD REPO INDEX (vietri-repo/index.html) ---
Write-Host "Building vietri-repo/index.html..."
$index = Get-Html -previewPath "preview.jpg" -jsContent $js -fixLinks $false
[System.IO.File]::WriteAllText("$PWD/vietri-repo/index.html", $index)

Write-Host "Build Complete!"
