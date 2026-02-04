import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_FILE = 'cards_template.csv';
const JSON_FILE = 'cards_library.json';

// Read CSV
try {
    const data = fs.readFileSync(path.join(__dirname, CSV_FILE), 'utf8');
    const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');

    // Parse Headers
    const headers = lines[0].split(',').map(h => h.trim());

    const library = [];

    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',');
        if (row.length < headers.length) continue;

        const card = {
            id: Date.now() + i,
            img: '',
            borderColor: '#0047AB', // Default, will be updated by Auto-Color in Editor
            gray: 0,
            colors: [],
            coins: 0,
            prestige: 0
        };

        // Map row data to card object
        row.forEach((val, idx) => {
            const header = headers[idx];
            const value = val.trim();

            if (header === 'ImageFile') {
                // Ensure path format matches local editor expectations
                card.img = './opere/' + value;
            } else if (header === 'Clay') {
                card.gray = parseInt(value) || 0;
            } else if (header === 'Coins') {
                card.coins = parseInt(value) || 0;
            } else if (header === 'Prestige') {
                card.prestige = parseInt(value) || 0;
            } else {
                // Color columns (Red, Blue, etc.)
                const qty = parseInt(value);
                if (qty > 0) {
                    card.colors.push({
                        type: header.toLowerCase(),
                        count: qty
                    });
                }
            }
        });

        library.push(card);
    }

    // Write JSON
    fs.writeFileSync(path.join(__dirname, JSON_FILE), JSON.stringify(library, null, 2));
    console.log(`Successfully converted ${library.length} cards to ${JSON_FILE}`);

} catch (e) {
    console.error("Error converting CSV:", e.message);
}
