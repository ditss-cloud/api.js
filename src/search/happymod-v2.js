const axios = require("axios");
const cheerio = require("cheerio");

async function getDetail(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Contoh selector, sesuaikan jika struktur Happymod berubah
    const versi = $('.app-info div:contains("Version")').next().text().trim() || null;
    const ukuran = $('.app-info div:contains("Size")').next().text().trim() || null;
    const tanggalUpdate = $('.app-info div:contains("Updated")').next().text().trim() || null;
    const deskripsi = $('#description').text().trim() || null;

    return { versi, ukuran, tanggalUpdate, deskripsi };
  } catch (err) {
    return { versi: null, ukuran: null, tanggalUpdate: null, deskripsi: null };
  }
}

async function happymod(query) {
  const url = 'https://www.happymod.com/search.html?q=' + encodeURIComponent(query);
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const results = [];

  const items = $('section div > div').slice(0, 5); // Ambil max 5 hasil

  for (let i = 0; i < items.length; i++) {
    const el = items.eq(i);

    const judul = el.find('h3 > a').text().trim();
    const linkPath = el.find('h3 > a').attr('href');
    const link = 'https://www.happymod.com' + linkPath;
    const rating = el.find('div.clearfix > span').text().trim() || null;
    const thumb = el.find('a > img').attr('data-original') || null;

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
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
