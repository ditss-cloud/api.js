const axios = require('axios'); // Pastikan menggunakan axios atau node-fetch untuk request eksternal

module.exports = function(app) {
    app.get('/tools/ssweb', async (req, res) => {
        const { apikey, url, device } = req.query;

        // Validasi API key
        if (!global.apikey || !global.apikey.includes(apikey)) {
            return res.json({ status: false, error: 'Apikey invalid' });
        }

        // Validasi URL
        if (!url) {
            return res.json({ status: false, error: 'URL is required' });
        }

        // Menentukan ukuran berdasarkan perangkat
        let width = 1280;
        let height = 1200;

        // Pengaturan ukuran untuk perangkat yang berbeda
        if (device === 'hp') {
            width = 375; // Lebar standar untuk HP
            height = 667; // Tinggi standar untuk HP
        } else if (device === 'tab') {
            width = 768; // Lebar standar untuk tablet
            height = 1280; // Tinggi standar untuk tablet
        } else if (device === 'laptop') {
            width = 1366; // Lebar standar untuk laptop
            height = 768; // Tinggi standar untuk laptop
        }

        // URL Encoding
        const encodedUrl = encodeURIComponent(url);

        try {
            // Menggunakan axios untuk request
            const response = await axios.get(`https://api.pikwy.com/?tkn=125&d=3000&u=${encodedUrl}&fs=0&w=${width}&h=${height}&s=100&z=100&f=$jpg&rt=jweb`);
            
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
            // Menangani error jika API eksternal gagal
            console.error('Error fetching screenshot:', error.message);
            res.status(500).json({ status: false, error: `Error: ${error.message}` });
        }
    });
};
