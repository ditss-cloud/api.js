const axios = require("axios");
const cheerio = require("cheerio");

async function happymod(query) {
  return new Promise((resolve, reject) => {
    axios.get('https://www.happymod.com/search.html?q=' + encodeURIComponent(query))
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const nama = [];
        const link = [];
        const rating = [];
        const thumb = [];
        const format = [];

        // Ambil judul dan link
        $('body > div.container-row.clearfix.container-wrap > div.container-left > section > div > div > h3 > a').each(function (_, el) {
          nama.push($(el).text());
          link.push('https://happymod.com' + $(el).attr('href'));
        });

        // Ambil rating
        $('body > div.container-row.clearfix.container-wrap > div.container-left > section > div > div > div.clearfix > span').each(function (_, el) {
          rating.push($(el).text());
        });

        // Ambil thumbnail
        $('body > div.container-row.clearfix.container-wrap > div.container-left > section > div > a > img').each(function (_, el) {
          thumb.push($(el).attr('data-original'));
        });

        // Gabungkan data
        for (let i = 0; i < link.length; i++) {
          format.push({
            judul: nama[i],
            thumb: thumb[i],
            rating: rating[i],
            link: link[i]
          });
        }

        resolve({
          creator: 'ditss',
          data: format
        });
      })
      .catch(reject);
  });
}

module.exports = function (app) {
  app.get('/search/happymod', async (req, res) => {
    try {
      const { apikey, q } = req.query;
      if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });
      if (!q) return res.json({ status: false, error: 'Query is required' });

      const results = await happymod(q);

      res.status(200).json({
        status: true,
        creator: results.creator,
        result: results.data
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
