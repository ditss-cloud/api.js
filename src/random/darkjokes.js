const { Darkjokes } = require('dhn-api');
const axios = require('axios');

module.exports = function (app) {
  app.get('/random/darkjokes', async (req, res) => {
    try {
      const { apikey } = req.query;
      if (!global.apikey || !global.apikey.includes(apikey)) {
        return res.json({ status: false, error: 'Apikey invalid' });
      }

      const result = await Darkjokes();

      // Ambil gambar sebagai buffer
      const response = await axios.get(result.url, { responseType: 'arraybuffer' });

      res.writeHead(200, {
        'Content-Type': 'image/jpeg', // atau 'image/png' jika sesuai
        'Content-Length': response.data.length
      });
      res.end(response.data);

    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  });
};
