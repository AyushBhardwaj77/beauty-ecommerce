const https = require('https');
const ids = [
    '1599305090598-fe179d501227',
    '1608248543803-ba4f8c70ae0b',
    '1608280022646-e55594ec18cc',
    '1617897903246-719242758050',
    '1598440947619-2c35fc9aa008'
];

async function run() {
    for (const id of ids) {
        await new Promise((resolve) => {
            https.get(`https://images.unsplash.com/photo-${id}?w=200`, (res) => {
                console.log(`${id}: ${res.statusCode}`);
                resolve();
            });
        });
    }
}
run();
