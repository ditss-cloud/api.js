const fetch = require('node-fetch');

/*async function getBuffer(url) {
    const res = await fetch(url);
    const buffer = await res.buffer();
    return buffer;
}
*/
module.exports = function(app) {

    async function fetchLoliImageBuffer() {
        // Langsung fetch endpoint yang langsung kasih gambar
        const res = await fetch('https://weeb-api.vercel.app/loli');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const buffer = await res.buffer();
        return buffer;
    }

    app.get('/random/loli', async (req, res) => {
        try {
            const { apikey } = req.query;
            if (!global.apikey || !global.apikey.includes(apikey)) {
                return res.json({ status: false, error: 'Apikey invalid' });
            }

            const imageBuffer = await fetchLoliImageBuffer();

            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': imageBuffer.length,
            });
            res.end(imageBuffer);

        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    });

};
