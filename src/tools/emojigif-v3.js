const axios = require('axios');

module.exports = function(app) {
    app.get('/tools/emojitogif-v3', async (req, res) => {
        const { apikey, emoji } = req.query;
        if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });

        try {
            const response = await axios.get('https://tenor.googleapis.com/v2/search', {
                params: {
                    key: 'YOUR_TENOR_API_KEY', // Ganti dengan API key Tenor kamu
                    q: emoji,
                    limit: 1,
                    media_filter: 'minimal',
                    contentfilter: 'high'
                }
            });

            const gif = response.data.results?.[0]?.media_formats?.gif?.url;
            if (!gif) return res.json({ status: false, error: 'GIF not found' });

            const image = (await axios.get(gif, { responseType: 'arraybuffer' })).data;

            res.writeHead(200, {
                'Content-Type': 'image/gif',
                'Content-Length': image.length
            });
            res.end(image);

        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
