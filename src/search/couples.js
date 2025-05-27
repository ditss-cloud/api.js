const { Couples } = require('dhn-api');

module.exports = function (app) {
  app.get('/couples', async (req, res) => {
    try {
      const { apikey } = req.query;
      if (!global.apikey || !global.apikey.includes(apikey)) {
        return res.json({ status: false, error: 'Apikey invalid' });
      }

      const result = await Couples(); // huruf C kapital

      res.status(200).json({
        status: true,
        result: {
          male: result.male,
          female: result.female
        }
      });
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  });
};
