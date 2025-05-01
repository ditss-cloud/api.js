const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {
    app.get('/tools/cari-grup', async (req, res) => {
        const { apikey, query } = req.query;

        // Validasi API Key
        if (!global.apikey.includes(apikey)) {
            return res.json({ status: false, error: 'Apikey invalid' });
        }

        // Validasi Query
        if (!query) {
            return res.json({ status: false, error: 'Query is required' });
        }

        try {
            const searchURL = `https://grupwa.com/?s=${encodeURIComponent(query)}`;
            const { data } = await axios.get(searchURL);
            const $ = cheerio.load(data);
            const hasil = [];

            $('.list-group .list-group-item').each((i, el) => {
                const nama = $(el).find('h4').text().trim();
                const link = $(el).find('a').attr('href');
                if (nama && link && link.includes('chat.whatsapp.com')) {
                    hasil.push({ nama, link });
                }
            });

            if (hasil.length === 0) {
                return res.json({ status: false, error: 'Grup tidak ditemukan' });
            }

            res.status(200).json({
                status: true,
                query,
                results: hasil
            });

        } catch (error) {
            console.error('Error fetching group:', error.message);
            res.status(500).json({ status: false, error: `Error: ${error.message}` });
        }
    });
};
