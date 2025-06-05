const { Primbon } = require('scrape-primbon');
const primbon = new Primbon();

module.exports = function (app) {
  app.get('/primbon/kecocokannama', async (req, res) => {
    try {
      const { nama, tgl, bln, thn, apikey } = req.query;

      // Validasi apikey
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({ status: false, error: 'Apikey invalid' });
      }

      // Validasi parameter lengkap
      if (![nama, tgl, bln, thn].every(Boolean)) {
        return res.status(400).json({ status: false, error: 'Parameter tidak lengkap' });
      }

      const result = await primbon.kecocokan_nama(nama, tgl, bln, thn);

      if (!result.status) {
        return res.status(500).json({ status: false, error: result.message || 'Gagal mencari kecocokan nama' });
      }

      res.json({
        status: true,
        jenis: 'Primbon Kecocokan Nama',
        nama: nama,
        tanggal_lahir: `${tgl}-${bln}-${thn}`,
        data: result
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: err.message });
    }
  });
};
