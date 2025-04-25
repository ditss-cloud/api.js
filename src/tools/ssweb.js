const axios = require('axios'); 

module.exports = function(app) {
    app.get('/tools/ssweb', async (req, res) => {
        const { apikey, url } = req.query;

        // Validasi API Key
        if (!global.apikey.includes(apikey)) {
            return res.json({ status: false, error: 'Apikey invalid' });
        }

        // Validasi URL
        if (!url) {
            return res.json({ status: false, error: 'URL is required' });
        }

        try {
            // URL Encoding
            const encodedUrl = encodeURIComponent(url);

            // Request ke API Pikwy
            console.log(`Requesting to API: https://api.pikwy.com/?tkn=125&d=3000&u=${encodedUrl}&fs=0&w=1280&h=1200&s=100&z=100&f=$jpg&rt=jweb`);

            const response = await axios.get(`https://api.pikwy.com/?tkn=125&d=3000&u=${encodedUrl}&fs=0&w=1280&h=1200&s=100&z=100&f=$jpg&rt=jweb`);

            console.log("API Response: ", response.data);

            // Mengecek jika iurl ada di dalam response
            const result = response.data.iurl;

            if (!result) {
                return res.json({ status: false, error: 'Unable to retrieve screenshot. Response does not contain iurl.' });
            }

            // Mengirimkan response dengan URL gambar
            res.status(200).json({
                status: true,
                result: result
            });
        } catch (error) {
            // Menangani error jika request gagal
            console.error('Error fetching screenshot:', error.message);
            res.status(500).json({ status: false, error: `Error: ${error.message}` });
        }
    });
};
