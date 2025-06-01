const axios = require("axios");
const cheerio = require("cheerio");

async function happymod(query) {
  return new Promise((resolve, reject) => {
    axios.get("https://www.happymod.com/search.html?q=" + query)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const nama = [];
        const link = [];
        const rating = [];
        const thumb = [];
        const version = [];
        const format = [];

        // Judul + link
        $('div.pdt-app-box h3 > a').each((i, el) => {
          nama.push($(el).text().trim());
          link.push('https://happymod.com' + $(el).attr('href'));
        });

        // Rating
        $('div.pdt-app-box div.stars > span').each((i, el) => {
          rating.push($(el).text().trim());
        });

        // Thumbnail
        $('div.pdt-app-box a > img').each((i, el) => {
          thumb.push($(el).attr('data-original'));
        });

        // Version
        $('div.pdt-version').each((i, el) => {
          version.push($(el).text().replace('Latest version: ', '').trim());
        });

        for (let i = 0; i < link.length; i++) {
          format.push({
            judul: nama[i],
            version: version[i] || 'Unknown',
            thumb: thumb[i] || null,
            rating: rating[i] || 'N/A',
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
        result: results
      });
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  });
};
