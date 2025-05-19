const fetch = require('node-fetch');

module.exports = function(app) {
  async function NeekoiAI(query) {
    const char = "BcmGcydtAX1OXnnIpZ7YhKCs5fh9QjyZ6_XSGX5I2zI";
    const url = `https://cai.neekoi.me/cai?char=${char}&message=${encodeURIComponent(query)}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.reply) throw new Error("Tidak ada jawaban dari AI");
    return data.reply;
  }

  // Endpoint tanpa apikey
  app.get('/ai/walid', async (req, res) => {
    try {
      const { text } = req.query;
      if (!text) return res.status(400).json({ status: false, error: "Parameter 'text' wajib diisi" });

      const result = await NeekoiAI(text);
      res.status(200).json({
        status: true,
        image: req.hostname
        result: result
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
}
