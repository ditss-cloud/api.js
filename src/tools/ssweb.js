const axios = require('axios'); // Gunakan axios untuk request HTTP

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
            const response = await axios.get(`https://api.pikwy.com/?tkn=125&d=3000&u=${encodedUrl}&fs=0&w=1280&h=1200&s=100&z=100&f=$jpg&rt=jweb`);
            
            // Menyaring hasil dari response untuk mendapatkan gambar URL
            const result = response.data.iurl;

            if (!result) {
                return res.json({ status: false, error: 'Unable to retrieve screenshot.' });
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
