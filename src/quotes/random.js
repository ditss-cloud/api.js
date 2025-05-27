const { Quotes } = require('dhn-api');

module.exports = function (app) {
  app.get('/quotes/random', async (req, res) => {
    try {
      const { apikey } = req.query;
      if (!global.apikey || !global.apikey.includes(apikey)) {
        return res.json({ status: false, error: 'Apikey invalid' });
      }

      const result = await Quotes(); 

      res.status(200).json({
        status: true,
        result: {
          author: result.author,
          quotes: result.quotes
        }
      });
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  });
};
