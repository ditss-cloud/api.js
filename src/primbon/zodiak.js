const { Primbon } = require('scrape-primbon');
const primbon = new Primbon();

module.exports = function (app) {
  app.get('/primbon/zodiak', async (req, res) => {
    try {
      const { zodiac, apikey } = req.query;

      // Validasi apikey
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({ status: false, error: 'Apikey invalid' });
      }

      if (!zodiac) {
        return res.status(400).json({ status: false, error: 'Parameter zodiac wajib diisi' });
      }

      const result = await primbon.zodiak(zodiac.toLowerCase());

      if (!result.status) {
        return res.status(500).json({ status: false, error: result.message || 'Gagal mencari zodiak' });
      }

      res.json({
        status: true,
        jenis: 'Primbon Zodiak',
        zodiac: zodiac.toLowerCase(),
        data: result
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: err.message });
    }
  });
};
