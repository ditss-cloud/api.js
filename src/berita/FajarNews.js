const { FajarNews } = require('dhn-api');

module.exports = function (app) {
  app.get('/news/fajar', async (req, res) => {
    try {
      const { apikey } = req.query;

      if (!global.apikey.includes(apikey)) {
        return res.json({ status: false, error: 'Apikey invalid' });
      }

      const result = await FajarNews();

      if (!result || !Array.isArray(result) || result.length === 0) {
        return res.status(404).json({ status: false, error: 'Tidak ada berita ditemukan.' });
      }

      res.json({
        status: true,
        source: 'Fajar News',
        total: result.length,
        berita: result
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
