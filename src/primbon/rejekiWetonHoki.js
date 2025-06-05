const { Primbon } = require('scrape-primbon');
const primbon = new Primbon();

module.exports = function (app) {
  app.get('/primbon/rejekihokiweton', async (req, res) => {
    try {
      const { tgl, bln, thn, apikey } = req.query;

      // Validasi apikey
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({ status: false, error: 'Apikey invalid' });
      }

      // Validasi parameter lengkap
      if (![tgl, bln, thn].every(Boolean)) {
        return res.status(400).json({ status: false, error: 'Parameter tgl, bln, dan thn wajib diisi' });
      }

      const result = await primbon.rejeki_hoki_weton(tgl, bln, thn);

      if (!result.status) {
        return res.status(500).json({ status: false, error: result.message || 'Gagal mencari rejeki hoki weton' });
      }

      res.json({
        status: true,
        jenis: 'Primbon Rejeki Hoki Weton',
        tanggal_lahir: `${tgl}-${bln}-${thn}`,
        data: result
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: err.message });
    }
  });
};
