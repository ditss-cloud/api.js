const { Primbon } = require('scrape-primbon');
const primbon = new Primbon();

module.exports = function (app) {
  app.get('/primbon/kecocokannamapasangan', async (req, res) => {
    try {
      const { nama1, nama2, apikey } = req.query;

      // Validasi apikey
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({ status: false, error: 'Apikey invalid' });
      }

      // Validasi parameter lengkap
      if (!nama1 || !nama2) {
        return res.status(400).json({ status: false, error: 'Parameter nama1 dan nama2 wajib diisi' });
      }

      const result = await primbon.kecocokan_nama_pasangan(nama1, nama2);

      if (!result.status) {
        return res.status(500).json({ status: false, error: result.message || 'Gagal mencari kecocokan nama pasangan' });
      }

      res.json({
        status: true,
        jenis: 'Primbon Kecocokan Nama Pasangan',
        pasangan: `${nama1} & ${nama2}`,
        data: result
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: err.message });
    }
  });
};
