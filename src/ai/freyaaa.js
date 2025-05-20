const fetch = require('node-fetch');

module.exports = function(app) {
  async function NeekoiAI(query) {
    const char = "f_05BqdQ-z7OC9-Ny3qrWnpwUdYdo192f1n4OZ_TAyY";
    const url = `https://cai.neekoi.me/cai?char=${char}&message=${encodeURIComponent(query)}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.reply) throw new Error("Tidak ada jawaban dari AI");
    return data.reply;
  }

  // Endpoint tanpa apikey
  app.get('/ai/freya-jkt48', async (req, res) => {
    try {
      const { text } = req.query;
      if (!text) return res.status(400).json({ status: false, error: "Parameter 'text' wajib diisi" });

      const result = await NeekoiAI(text);
      res.status(200).json({
        status: true,
        result: result
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
}
