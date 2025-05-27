const axios = require('axios');
const { JalanTikusMeme } = require('dhn-api');

async function getBuffer(url) {
  const res = await axios.get(url, {
    responseType: 'arraybuffer',
    headers: {
      'DNT': 1,
      'Upgrade-Insecure-Requests': 1
    }
  });
  return res.data;
}

module.exports = function (app) {
  app.get('/random/jalantikusmeme', async (req, res) => {
    try {
      const { apikey } = req.query;
      if (!global.apikey.includes(apikey)) {
        return res.json({ status: false, error: 'Apikey invalid' });
      }

      const imageUrl = await JalanTikusMeme(); // hasil string URL
      if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.startsWith('http')) {
        return res.status(400).json({ status: false, error: 'Invalid image URL' });
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
