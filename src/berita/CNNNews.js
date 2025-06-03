const { CNNNews } = require('dhn-api');

module.exports = function (app) {
  app.get('/news/cnn', async (req, res) => {
    try {
      const { apikey } = req.query;

      // Validasi apikey
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({ status: false, error: 'Apikey invalid' });
      }

      const result = await CNNNews();

      if (!Array.isArray(result) || result.length === 0) {
        return res.status(404).json({ status: false, error: 'Berita CNN tidak ditemukan.' });
      }

      res.json({
        status: true,
        source: 'CNN News',
        total: result.length,
        berita: result
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: err.message });
    }
  });
};
