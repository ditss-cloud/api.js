const axios = require("axios");
const cheerio = require("cheerio");

async function getDetail(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Update selector halaman detail, coba cek elemen detail aplikasi Happymod
    const versi = $('div.app-info > div:contains("Version")').next().text().trim() || null;
    const ukuran = $('div.app-info > div:contains("Size")').next().text().trim() || null;
    const tanggalUpdate = $('div.app-info > div:contains("Updated")').next().text().trim() || null;
    const deskripsi = $('#description').text().trim() || null;

    return { versi, ukuran, tanggalUpdate, deskripsi };
  } catch (err) {
    console.error('Error getDetail:', err.message);
    return { versi: null, ukuran: null, tanggalUpdate: null, deskripsi: null };
  }
}

async function happymod(query) {
  const url = 'https://www.happymod.com/search.html?q=' + encodeURIComponent(query);
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const results = [];

  // Contoh selector yang lebih umum dan update (cek dengan inspect element)
  const items = $('section div.mod-card').slice(0, 5);

  if(items.length === 0) {
    console.warn('Tidak menemukan item dengan selector "section div.mod-card". Coba periksa selector CSS.');
  }

  for (let i = 0; i < items.length; i++) {
    const el = items.eq(i);

    const judul = el.find('h3').text().trim() || null;
    const linkPath = el.find('a').attr('href') || null;
    const link = linkPath ? 'https://www.happymod.com' + linkPath : null;
    const rating = el.find('div.rating').text().trim() || null;
    const thumb = el.find('a > img').attr('src') || null;

    if(!link) {
      console.warn(`Item ke-${i} tidak memiliki link.`);
      continue;
    }

    // Ambil detail tambahan dari halaman aplikasi
    const detail = await getDetail(link);

    results.push({
      judul,
      link,
      rating,
      thumb,
      versi: detail.versi,
      ukuran: detail.ukuran,
      tanggalUpdate: detail.tanggalUpdate,
      deskripsi: detail.deskripsi
    });
  }

  return {
    creator: 'ditss',
    data: results
  };
}

module.exports = function (app) {
  app.get('/search/happymod-v2', async (req, res) => {
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
      console.error('API error:', error);
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
