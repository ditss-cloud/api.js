const fetch = require("node-fetch");

async function pinterest2(query) {
  return new Promise(async (resolve, reject) => {
    const baseUrl = 'https://www.pinterest.com/resource/BaseSearchResource/get/';
    const queryParams = {
      source_url: '/search/pins/?q=' + encodeURIComponent(query),
      data: JSON.stringify({
        options: {
          isPrefetch: false,
          query,
          scope: 'pins',
          no_fetch_context_on_resource: false
        },
        context: {}
      }),
      _: Date.now()
    };

    const url = new URL(baseUrl);
    Object.entries(queryParams).forEach(([key, val]) => {
      url.searchParams.set(key, val);
    });

    try {
      const response = await fetch(url.toString(), {
        headers: {
          'x-app-version': '1.0',
          'x-pinterest-appstate': 'active',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        }
      });

      if (!response.ok) throw new Error('Gagal mengambil data dari Pinterest');

      const json = await response.json();
      const results = json?.resource_response?.data?.results ?? [];

      if (!results.length) return resolve([]);

      const final = results
        .filter(item => item.images?.['736x'])
        .map(item => ({
          title: item.grid_title || '(Tanpa Judul)',
          pin_url: item.id ? 'https://www.pinterest.com/pin/' + item.id : '',
          image_url: item.images['736x'].url,
          created_at: item.created_at ? new Date(item.created_at).toISOString() : null
        }));

      resolve(final);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = function(app) {
  app.get('/search/pinterest', async (req, res) => {
    try {
      const { apikey, q } = req.query;
      if (!apikey || !global.apikey.includes(apikey)) {
        return res.status(403).json({ status: false, message: 'Apikey invalid' });
      }
      if (!q) {
        return res.status(400).json({ status: false, message: 'Query is required' });
      }

      const result = await pinterest2(q);
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
      res.status(500).json({ status: false, message: 'Terjadi kesalahan pada server', error: err.message });
    }
  });
};
