const axios = require('axios');
const { Cerpen } = require('dhn-api');

module.exports = function (app) {
  app.get('/cerpen', async (req, res) => {
    try {
      const { apikey, tema } = req.query;

      if (!global.apikey.includes(apikey)) {
        return res.json({ status: false, error: 'Apikey invalid' });
      }

      if (!tema) {
        return res.json({ status: false, error: 'Tema cerpen wajib diisi, contoh: ?tema=sedih' });
      }

      const result = await Cerpen(tema); 

      if (!result || typeof result !== 'object' || !result.result) {
        return res.status(500).json({ status: false, error: 'Gagal mengambil cerpen' });
      }

      res.json({
        status: true,
        tema,
        cerpen: result.result 
      });

    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
