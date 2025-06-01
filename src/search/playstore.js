const axios = require("axios");
const cheerio = require("cheerio");

async function PlayStore(search) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.get(`https://play.google.com/store/search?q=${encodeURIComponent(search)}&c=apps`);
            const $ = cheerio.load(data);
            const hasil = [];

            $('.VfPpkd-EScbFb-JIbuQc').each((i, el) => {
                if (hasil.length >= 50) return; // ✅ Batasi 50 hasil saja

                const linkEl = $(el).find('a').attr('href');
                const nama = $(el).find('.DdYX5').text();
                const developer = $(el).find('.wMUdtb').text();
                const ratingText = $(el).find('[role="img"]').attr('aria-label') || '';
                const ratingValue = $(el).find('.w2kbF').text();
                const img = $(el).find('img.T75of.sHb2Xb').attr('src') || $(el).find('img.T75of.sHb2Xb').attr('data-src');

                if (linkEl && nama) {
                    hasil.push({
                        nama,
                        developer: developer || 'Tidak diketahui',
                        rate: ratingText || 'No rating',
                        rate_number: ratingValue || '-',
                        icon: img || 'https://via.placeholder.com/150?text=No+Image',
                        link: `https://play.google.com${linkEl}`,
                        link_dev: developer ? `https://play.google.com/store/apps/developer?id=${encodeURIComponent(developer)}` : null
                    });
                }
            });

            resolve(hasil);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = function (app) {
    app.get('/search/playstore', async (req, res) => {
        try {
            const { apikey, q } = req.query;
            if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });
            if (!q) return res.json({ status: false, error: 'Query is required' });

            const result = await PlayStore(q);

            if (result.length === 0) return res.json({ status: false, message: 'Tidak ada hasil ditemukan' });

            res.json({
                status: true,
                result
            });
        } catch (err) {
            res.status(500).json({ status: false, error: err.message });
        }
    });
};
