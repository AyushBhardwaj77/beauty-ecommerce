const https = require('https');

const queries = ['skincare', 'hair-mask', 'mascara'];

queries.forEach(query => {
    https.get(`https://unsplash.com/s/photos/${query}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const matches = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-z0-9-]+/g);
            if (matches) {
                const unique = [...new Set(matches)];
                console.log(`\n\n=== ${query} ===`);
                unique.slice(0, 10).forEach(m => console.log(m));
            }
        });
    });
});
