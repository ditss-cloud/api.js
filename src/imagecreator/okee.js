const axios = require('axios');

const handler = async (req, res) => {
  const { url, apikey } = req.query;
  const validKey = 'DitssGanteng'; // Ganti dengan apikey kamu sendiri

  // Validasi input
  if (!url) {
    return res.status(400).json({ status: false, message: 'Masukkan parameter url' });
  }
  
  if (apikey !== validKey) {
    return res.status(403).json({ status: false, message: 'Apikey salah' });
  }

  try {
    // Panggil API Vreden untuk HDR dengan parameter pixel=4
    const response = await axios.get(`https://api.vreden.my.id/api/artificial/hdr?url=${url}&pixel=4`);
    
    // Cek hasil response API
    if (response.data.status === false) {
      return res.status(500).json({ status: false, message: 'Gagal memproses gambar' });
    }

    // Kembalikan hasil yang telah diproses
    res.status(200).json({
      status: true,
      result: response.data.result || response.data,
    });
  } catch (e) {
    // Tangani error
    res.status(500).json({ status: false, message: e.message });
  }
}

module.exports = handler;
