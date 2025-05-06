const axios = require('axios');

async function ffstalk(id) {
  let data = JSON.stringify({
    "app_id": 100067,
    "login_id": id
  });

  let config = {
    method: 'POST',
    url: 'https://kiosgamer.co.id/api/auth/player_id_login',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'sec-ch-ua-platform': '"Android"',
      'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      'sec-ch-ua-mobile': '?1',
      'Origin': 'https://kiosgamer.co.id',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Referer': 'https://kiosgamer.co.id/',
      'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
      // 'Cookie': '<your-cookie-here>', // Hati-hati dengan cookie di public repo!
    },
    data: data
  };

  const api = await axios.request(config);
  return api.data;
}

module.exports = function(app) {
  app.get('/stalk/ff2', async (req, res) => {
    const { apikey } = req.query;
    if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' })
    const { id } = req.query;
    if (!id) return res.json({ status: false, error: 'Id is required' })         
    try {            
      const results = await ffstalk(id);

      // Contoh parsing hasil (silakan sesuaikan dengan struktur asli API kiosgamer)
      // Misal response: { nickname, userId, region, level, ... }
      // Ganti variabel di bawah sesuai hasil sebenarnya
      let dataRespon = {
        user_id: results?.userId || id,
        nickname: results?.nickname || "-",
        region: results?.region || "-",
        level: results?.level || "-",
        avatar: results?.avatar_url || null,
        raw: results // tetap kirim raw data untuk debugging/pengembangan
      };

      // Jika ada error dari API eksternal
      if(results?.error || results?.status === false) {
        return res.status(404).json({
          status: false,
          message: results.error || "User tidak ditemukan atau response tidak valid",
          result: results
        });
      }

      res.status(200).json({
        status: true,
        message: "Success get Free Fire user info",
        result: dataRespon
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: `Error: ${error.message}`,
        result: null
      });
    }
  });
}
