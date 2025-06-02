const axios = require('axios');

module.exports = function (app) {
  app.get('/imagecreator/remini', async (req, res) => {
    const { apikey, url } = req.query;

    if (!global.apikey.includes(apikey)) {
      return res.status(403).json({ status: false, message: 'Apikey invalid' });
    }

    if (!url) {
      return res.status(400).json({ status: false, message: 'Parameter url tidak ditemukan' });
    }

    try {
      // Gunakan URL langsung tanpa params
      const apiUrl = `https://anabot.my.id/api/ai/remini?imageUrl=${encodeURIComponent(url)}&apikey=freeApikey`;

      // Ambil respon dari API pihak kedua
      const resultApi = await axios.get(apiUrl);
      const imageUrl = resultApi?.data?.data?.result;

      if (!imageUrl) {
        return res.status(500).json({ status: false, message: 'Gagal mendapatkan gambar dari API pihak kedua' });
      }

      // Ambil gambar dari result URL
      const imageRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });

      // Kirim gambar langsung ke klien
      res.set('Content-Type', 'image/png');
      res.send(imageRes.data);
    } catch (err) {
      console.error('Remini V2 Error:', err?.response?.data || err.message);
      res.status(500).json({
        status: false,
        message: 'Terjadi kesalahan saat memproses gambar',
        error: err?.response?.data || err.message
      });
    }
  });
};
