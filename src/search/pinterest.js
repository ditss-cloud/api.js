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
      _: Date.now() // Membuat timestamp agar tidak tercache
    };
    
    // Membuat URL dengan query params
    const url = new URL(baseUrl);
    Object.entries(queryParams).forEach(entry => url.searchParams.set(entry[0], entry[1]));

    try {
      const response = await fetch(url.toString());
      if (!response.ok) throw new Error('Failed to fetch data from Pinterest'); // Cek jika status error

      const json = await response.json();
      const results = json?.resource_response?.data?.results ?? [];

      // Pastikan kita menangani data dengan baik
      const result = results.map(item => ({
        pin: item.id ? 'https://www.pinterest.com/pin/' + item.id : '',
        link: item.link || '',
        created_at: item.created_at ? (new Date(item.created_at)).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }) : '',
        id: item.id || '',
        images_url: item.images?.['736x']?.url || '',
        grid_title: item.grid_title || ''
      }));

      // Mengembalikan hasil
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = function(app) {
  app.get('/search/pinterest', async (req, res) => {
    try {
      const { apikey } = req.query;
      if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });

      const { q } = req.query;
      if (!q) return res.json({ status: false, error: 'Query is required' });

      const results = await pinterest2(q);

      // Mengirimkan response jika berhasil
      res.status(200).json({
        status: true,
        result: results
      });
    } catch (error) {
      // Menangani error dengan memberikan pesan yang jelas
      console.error(error);
      res.status(500).send(`Error: ${error.message}`);
    }
  });
};
