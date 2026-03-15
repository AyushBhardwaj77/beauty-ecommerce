const https = require('https');
const fs = require('fs');

const products = [
    { id: 1, image: '1620916566398-39f1143ab7be' },
    { id: 2, image: '1608248597279-f99d160bfbc8' },
    { id: 3, image: '1611930022073-b7a4ba5fcccd' },
    { id: 4, image: '1611080626919-7cf5a9dbab5b' },
    { id: 5, image: '1571781926291-c477ebfd024b' },
    { id: 6, image: '1596462502278-27bfdd403348' },
    { id: 7, image: '1556228720-195a672e8a03' },
    { id: 8, image: '1612817288484-6f916006741a' },
    { id: 9, image: '1586495777744-4413f21062fa' },
    { id: 10, image: '1512496015851-a90fb38ba796' },
    { id: 11, image: '1631214540553-ff044a3ff1ea' },
    { id: 12, image: '1557205465-f3762edea6d3' },
    { id: 13, image: '1625093742435-09869f61b4b4' },
    { id: 14, image: '1527799820374-dcf8d9d4a388' },
    { id: 15, image: '1522338140262-f46f5913618a' },
    { id: 16, image: '1576426863848-c0e7c0e91e3d' },
    { id: 17, image: '1571875257727-256c39da42af' },
    { id: 18, image: '1541643600914-78b084683601' },
];

const checkUrl = (id) => {
    return new Promise((resolve) => {
        const url = `https://images.unsplash.com/photo-${id}?w=400&q=80`;
        https.get(url, (res) => {
            resolve({ id, status: res.statusCode });
        }).on('error', (e) => {
            resolve({ id, status: 'error', error: e.message });
        });
    });
};

async function run() {
    let out = '';
    for (const p of products) {
        const result = await checkUrl(p.image);
        out += `${p.id}: ${result.status}\n`;
    }
    fs.writeFileSync('url_status.txt', out);
}
run();
