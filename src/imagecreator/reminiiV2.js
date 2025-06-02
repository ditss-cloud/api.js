const axios = require('axios');

module.exports = function (app) {
  // Remini V2 menggunakan API pihak ketiga
  app.get('/imagecreator/remini', async (req, res) => {
    const { apikey, url } = req.query;

    // Validasi apikey
    if (!global.apikey.includes(apikey)) {
      return res.status(403).json({ status: false, message: 'Apikey invalid' });
    }

    // Validasi URL
    if (!url) {
      return res.status(400).json({ status: false, message: 'Parameter url tidak ditemukan' });
    }

    try {
      // Panggil API pihak ketiga
      const response = await axios.get(`https://anabot.my.id/api/ai/remini`, {
        params: {
          imageUrl: url,
          apikey: 'freeApikey'
        },
        responseType: 'arraybuffer' // supaya bisa langsung stream image
      });

      // Kirim gambar langsung sebagai response
      res.set('Content-Type', 'image/jpeg');
      res.send(response.data);
    } catch (error) {
      console.error('Remini v2 error:', error?.response?.data || error.message);
      res.status(500).json({
        status: false,
        message: 'Gagal memproses gambar',
        error: error?.response?.data || error.message
      });
    }
  });
};
