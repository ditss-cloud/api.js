const axios = require('axios');


const getBuffer = async (url) => {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    return res.data;
};


async function anim() {
    try {
        const urls = [
            'https://img12.pixhost.to/images/507/570627648_skyzopedia.jpg',
            'https://img12.pixhost.to/images/507/570627649_example1.jpg',
            'https://img12.pixhost.to/images/507/570627650_example2.jpg',
            'https://img12.pixhost.to/images/507/570627651_example3.jpg'
            // Tambahkan URL lain sesukamu
        ];
        const randomUrl = urls[Math.floor(Math.random() * urls.length)];
        const response = await getBuffer(randomUrl);
        return response;
    } catch (error) {
        throw error;
    }
}

// Export router
module.exports = function app(app) {
    app.get('/random/cucimata', async (req, res) => {
        try {
            
            const buffer = await anim();
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': buffer.length,
            });
            res.end(buffer);
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    });
};
