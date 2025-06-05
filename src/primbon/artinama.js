const { Primbon } = require('scrape-primbon');
const primbon = new Primbon();

module.exports = function (app) {
  app.get('/primbon/artinama', async (req, res) => {
    try {
      const { nama, apikey } = req.query;

      // Validasi apikey
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({ status: false, error: 'Apikey invalid' });
      }

      // Validasi parameter nama
      if (!nama) {
        return res.status(400).json({ status: false, error: 'Parameter nama tidak boleh kosong' });
      }

      const result = await primbon.arti_nama(nama);

      if (!result.status) {
        return res.status(500).json({ status: false, error: result.message || 'Gagal mencari arti nama' });
      }

      res.json({
        status: true,
        jenis: 'Primbon Arti Nama',
        nama: nama,
        data: result
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: err.message });
    }
  });
};
