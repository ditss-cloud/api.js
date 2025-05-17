const axios = require('axios');
const express = require('express');
const router = express.Router();

module.exports = function (app) {
    router.get('/random/nokos', async (req, res) => {
        try {
            const { country, apikey } = req.query;

            if (!apikey || !global.apikey.includes(apikey)) {
                return res.json({ status: false, creator: 'ditss', error: 'Apikey invalid' });
            }

            if (!country) {
                return res.json({ status: false, creator: 'ditss', error: 'Parameter country wajib diisi' });
            }

            const url = `https://virtusim.com/api/json.php?api_key=fsxJrCcuEv4KmQq0tRBIzigVjwSNZh&action=services&country=${encodeURIComponent(country)}`;

            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36',
                    'Accept': 'application/json'
                },
                timeout: 10000
            });

            const result = response.data;

            if (!Array.isArray(result) || result.length === 0) {
                return res.json({ status: false, creator: 'ditss', error: 'Gagal mengambil data nokos: Data nokos kosong atau tidak ditemukan' });
            }

            return res.json({ status: true, creator: 'ditss', result });

        } catch (error) {
            console.error('[VirtuSim API Error]', error.message);
            return res.json({ status: false, creator: 'ditss', error: 'Gagal mengambil data nokos: ' + error.message });
        }
    });

    app.use('/random', router);
};
