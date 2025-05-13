const axios = require("axios");
const cheerio = require("cheerio");

async function waStalk(channelId) {
  const url = `https://www.whatsapp.com/channel/${channelId}`;
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  const name = $('meta[property="og:title"]').attr('content');
  const desc = $('meta[property="og:description"]').attr('content');
  const image = $('meta[property="og:image"]').attr('content');
  const channelUrl = url;

  if (!name) throw new Error("Gagal mengambil data, pastikan ID benar");

  return {
    name,
    description: desc,
    image,
    channelId,
    channelUrl
  };
}

module.exports = function (app) {
  app.get('/stalk/whatsapp', async (req, res) => {
    const { apikey, id } = req.query;
    if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });
    if (!id) return res.json({ status: false, error: 'Channel ID is required' });

    try {
      const result = await waStalk(id);
      res.status(200).json({
        status: true,
        result
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
