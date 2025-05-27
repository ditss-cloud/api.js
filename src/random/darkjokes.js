const { Darkjokes } = require('dhn-api');
const axios = require('axios');

async function getBuffer(url) {
  const res = await axios.get(url, {
    responseType: 'arraybuffer',
    headers: {
      'DNT': 1,
      'Upgrade-Insecure-Request': 1
    }
  });
  return res.data;
}

module.exports = function (app) {
  app.get('/darkjokes', async (req, res) => {
    try {
      const { apikey } = req.query;
      if (!global.apikey.includes(apikey)) {
        return res.json({ status: false, error: 'Apikey invalid' });
      }

      let result = await Darkjokes();
      let imageUrl = typeof result === 'string' ? result : result.url;

      if (!imageUrl || !imageUrl.startsWith('http')) {
        return res.status(400).json({ status: false, error: 'Invalid image URL from Darkjokes()' });
      }

      const buffer = await getBuffer(imageUrl);
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': buffer.length
      });
      res.end(buffer);

    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  });
};
