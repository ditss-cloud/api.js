const axios = require('axios');

module.exports = function (app) {
  app.get('/imagecreator/toanime', async (req, res) => {
    const { apikey, url } = req.query;

    // Validasi API key
    if (!global.apikey.includes(apikey)) {
      return res.status(403).json({ status: false, message: 'Apikey invalid' });
    }

    // Validasi parameter URL
    if (!url) {
      return res.status(400).json({ status: false, message: 'Parameter url tidak ditemukan' });
    }

    try {
      // Panggil API toAnime dari anabot
      const apiUrl = `https://beta.anabot.my.id/api/ai/toAnime?imageUrl=${encodeURIComponent(url)}&apikey=freeApikey`;

      const resultApi = await axios.get(apiUrl);
      const imageUrl = resultApi?.data?.data?.result;

      if (!imageUrl) {
        return res.status(500).json({ status: false, message: 'Gagal mendapatkan gambar dari API pihak kedua' });
      }

      // Ambil gambar dari hasil API dan kirim langsung
      const imageRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });

      res.set('Content-Type', 'image/png');
      res.send(imageRes.data);
    } catch (err) {
      console.error('Anime Image Error:', err?.response?.data || err.message);
      res.status(500).json({
        status: false,
        message: 'Terjadi kesalahan saat memproses gambar',
        error: err?.response?.data || err.message
      });
    }
  });
};
