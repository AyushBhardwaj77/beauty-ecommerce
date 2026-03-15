const https = require('https');
const ids = [
    '1556228578-0d85b1a4d571', // Pipette bottle
    '1607554904250-ee7e641777ed', // Pump bottle
    '1598440947619-2c35fc9aa008', // Cream jar
    '1629198688000-71f23e745b6e', // Hair care bottle
    '1590156546946-ce55a12a6a10', // Cosmetics abstract
    '1617897903246-719242758050', // Pipette drops
    '1535585209827-a15fddba46a2', // Hair accessories / brush
    '1611080626919-7cf5a9dbab5b', // Cloud Cream Moisturizer
    '1585232351009-73e4e1be4010', // Hair oil / dropper (amber glass bottle)
    '1601053151740-1926217417e2', // Cream tube / hair mask
    '1593100126277-2fe6c83602a8', // Scalp scrub jar / generic tub
    '1615397323143-698e6c469b76', // Jar
    '1512496015851-a90fb38ba796', // Contour Wand placeholder
    '1620916566398-39f1143ab7be'  // Nécessaire tube (fallback)
];

async function run() {
    for (const id of ids) {
        await new Promise((resolve) => {
            https.get(`https://images.unsplash.com/photo-${id}?w=400`, (res) => {
                console.log(`${id}: ${res.statusCode}`);
                resolve();
            });
        });
    }
}
run();
