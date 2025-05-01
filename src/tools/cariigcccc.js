const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {
    app.get('/tools/cari-grup', async (req, res) => {
        const { apikey, query } = req.query;

        // Validasi API Key
        if (!global.apikey || !global.apikey.includes(apikey)) {
            return res.json({ status: false, error: 'Apikey invalid' });
        }

        // Validasi Query
        if (!query) {
            return res.json({ status: false, error: 'Query is required' });
        }

        try {
            const searchURL = `https://grupwa.com/?s=${encodeURIComponent(query)}`;
            
            // Gunakan User-Agent untuk menghindari pemblokiran oleh situs target
            const { data } = await axios.get(searchURL, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            const $ = cheerio.load(data);
            const hasil = [];

            // Perbarui selector sesuai dengan struktur HTML terbaru
            $('.list-group-item').each((i, el) => {
                const nama = $(el).find('h4').text().trim();
                const link = $(el).find('a').attr('href');
                if (nama && link && link.includes('chat.whatsapp.com')) {
                    hasil.push({ nama, link });
                }
            });

            // Jika tidak ada hasil
            if (hasil.length === 0) {
                return res.json({ status: false, error: 'Grup tidak ditemukan, atau struktur HTML situs berubah.' });
            }

            // Respon berhasil
            res.status(200).json({
                status: true,
                query,
                results: hasil
            });

        } catch (error) {
            console.error('Error fetching group:', error.message);

            // Tangani error dengan lebih informatif
            res.status(500).json({ 
                status: false, 
                error: `Terjadi kesalahan saat mengambil data grup. Detail: ${error.message}` 
            });
        }
    });
};
