const { Darkjokes } = require('dhn-api');

module.exports = function (app) {
  app.get('/ramdom/darkjokes', async (req, res) => {
    try {
      const { apikey } = req.query;
      if (!global.apikey || !global.apikey.includes(apikey)) {
        return res.json({ status: false, error: 'Apikey invalid' });
      }

      const result = await Darkjokes();

      // Langsung redirect ke URL gambar
      res.redirect(result.url);
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  });
};
