const axios = require('axios');

module.exports = function (app) {
  app.get('/imagecreator/tozombie', async (req, res) => {
    const { apikey, url } = req.query;

    if (!global.apikey.includes(apikey)) {
      return res.status(403).json({ status: false, message: 'Apikey invalid' });
    }

    if (!url) {
      return res.status(400).json({ status: false, message: 'Parameter url tidak ditemukan' });
    }

    try {
      // Panggil API toZombie dari anabot
      const apiUrl = `https://anabot.my.id/api/ai/toZombie?urlsImg=${encodeURIComponent(url)}&apikey=freeApikey`;

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
      console.error('Zombie Image Error:', err?.response?.data || err.message);
      res.status(500).json({
        status: false,
        message: 'Terjadi kesalahan saat memproses gambar',
        error: err?.response?.data || err.message
      });
    }
  });
};
