const gis = require("g-i-s");

async function pinterest(query) {
  return new Promise((resolve, reject) => {
    gis({ searchTerm: query + ' site:pinterest.com' }, (error, results) => {
      if (error) return reject({ status: false, message: "Terjadi kesalahan", error });
      const urls = results.map(x => x.url);
      resolve(urls);
    });
  });
}

module.exports = function(app) {
  app.get('/search/pinterest', async (req, res) => {
    try {
      const { apikey, q } = req.query;

      // Ganti dengan daftar apikey milikmu
      if (!apikey || !global.apikey?.includes(apikey)) {
        return res.status(403).json({ status: false, message: 'Apikey invalid' });
      }

      if (!q) {
        return res.status(400).json({ status: false, message: 'Query is required' });
      }

      const result = await pinterest(q);

      if (!result.length) {
        return res.json({ status: false, message: 'Tidak ditemukan hasil' });
      }

      res.json({
        status: true,
        creator: 'Ditss',
        data: result[Math.floor(Math.random() * result.length)]
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: false,
        message: 'Terjadi kesalahan pada server',
        error: err.message
      });
    }
  });
}
