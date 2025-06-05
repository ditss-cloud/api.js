const { Primbon } = require('scrape-primbon');
const primbon = new Primbon();

module.exports = function (app) {
  app.get('/primbon/nomerhoki', async (req, res) => {
    try {
      const { nomer, apikey } = req.query;

      // Validasi apikey
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({ status: false, error: 'Apikey invalid' });
      }

      // Validasi parameter
      if (!nomer) {
        return res.status(400).json({ status: false, error: 'Parameter "nomer" wajib diisi' });
      }

      // Proses Primbon
      const result = await primbon.nomer_hoki(nomer);

      if (!result.status) {
        return res.status(500).json({ status: false, error: result.message || 'Gagal mendapatkan hasil nomer hoki' });
      }

      res.json({
        status: true,
        jenis: 'Primbon Nomer Hoki',
        nomer,
        data: result
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: err.message });
    }
  });
};
