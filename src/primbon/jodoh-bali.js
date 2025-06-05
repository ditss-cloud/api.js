const { Primbon } = require('scrape-primbon');
const primbon = new Primbon();

module.exports = function (app) {
  app.get('/primbon/ramalanjodohbali', async (req, res) => {
    try {
      const {
        nama1, tgl1, bln1, thn1,
        nama2, tgl2, bln2, thn2,
        apikey
      } = req.query;

      // Validasi apikey
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({ status: false, error: 'Apikey invalid' });
      }

      // Validasi parameter
      if (![nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2].every(Boolean)) {
        return res.status(400).json({ status: false, error: 'Parameter tidak lengkap' });
      }

      const result = await primbon.ramalan_jodoh_bali(
        nama1, tgl1, bln1, thn1,
        nama2, tgl2, bln2, thn2
      );

      if (!result.status) {
        return res.status(500).json({ status: false, error: result.message || 'Gagal meramal jodoh bali' });
      }

      res.json({
        status: true,
        jenis: 'Primbon Ramalan Jodoh Bali',
        pasangan: `${nama1} ❤️ ${nama2}`,
        data: result
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, error: err.message });
    }
  });
};
