const { Primbon } = require('scrape-primbon');
const primbon = new Primbon();

module.exports = function (app) {
  app.get('/primbon/tafsirmimpi', async (req, res) => {
    try {
      const { mimpi, apikey } = req.query;

      // Validasi apikey
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({ status: false, error: 'Apikey invalid' });
      }

      // Validasi parameter
      if (!mimpi) {
        return res.status(400).json({ status: false, error: 'Parameter "mimpi" wajib diisi' });
      }

      const result = await primbon.tafsir_mimpi(mimpi);

      if (!result.status) {
        return res.status(500).json({ status: false, error: result.message || 'Gagal menafsir mimpi' });
      }

      res.json({
        status: true,
        jenis: 'Primbon Tafsir Mimpi',
        mimpi,
        data: result
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: err.message });
    }
  });
};
