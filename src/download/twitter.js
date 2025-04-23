const axios = require("axios");

module.exports = function (app) {
  app.get('/download/twitter', async (req, res) => {
    const { apikey, url } = req.query;
    if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });
    if (!url) return res.json({ status: false, error: 'Parameter url diperlukan' });

    try {
      const response = await axios.get('https://beta.anabot.my.id/api/download/twitter', {
        params: {
          url,
          apikey: 'freeApikey'
        }
      });

      const result = response.data;

      if (result.status && result.data) {
        res.json({
          status: true,
          creator: 'Ditss',
          result: result.data
        });
      } else {
        res.status(500).json({ status: false, error: 'Gagal mendapatkan data', response: result });
      }
    } catch (err) {
      res.status(500).json({ status: false, error: err.message });
    }
  });
}
