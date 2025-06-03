const { iNews } = require('dhn-api');

module.exports = function (app) {
  app.get('/news/inews', async (req, res) => {
    try {
      const { apikey } = req.query;

      // Validasi apikey
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({ status: false, error: 'Apikey invalid' });
      }

      const result = await iNews();

      if (!Array.isArray(result) || result.length === 0) {
        return res.status(404).json({ status: false, error: 'Berita iNews tidak ditemukan.' });
      }

      res.json({
        status: true,
        source: 'iNews',
        total: result.length,
        berita: result
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: err.message });
    }
  });
};
