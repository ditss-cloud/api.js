const axios = require("axios");

function getInspepek() {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

const InsAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6)",
  "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL)"
];

const nahidaModel = {
  voice_id: "67ae0979-5d4b-11ee-a861-00163e2ac61b",
  voice_name: "Nahida"
};

module.exports = function(app) {
  app.get('/tools/tts-nahida', async (req, res) => {
    const { apikey, text } = req.query;

    if (!global.apikey.includes(apikey)) {
      return res.status(403).json({ status: false, error: 'Apikey invalid' });
    }

    if (!text) {
      return res.status(400).json({ status: false, error: 'Text tidak boleh kosong' });
    }

    const ngeloot = {
      raw_text: text,
      url: "https://filme.imyfone.com/text-to-speech/anime-text-to-speech/",
      product_id: "200054",
      convert_data: [{
        voice_id: nahidaModel.voice_id,
        speed: "1",
        volume: "50",
        text,
        pos: 0
      }]
    };

    const headers = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'X-Forwarded-For': getInspepek(),
      'User-Agent': InsAgents[Math.floor(Math.random() * InsAgents.length)]
    };

    try {
      const response = await axios.post(
        'https://voxbox-tts-api.imyfone.com/pc/v1/voice/tts',
        ngeloot,
        { headers }
      );

      const audioUrl = response.data?.data?.convert_result?.[0]?.oss_url;
      if (!audioUrl) {
        return res.status(500).json({ status: false, error: 'Gagal mengambil audio URL' });
      }

      // Stream audio ke client
      const audioStream = await axios.get(audioUrl, { responseType: 'stream' });
      res.setHeader('Content-Type', 'audio/mpeg');
      audioStream.data.pipe(res);
      
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
