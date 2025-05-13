const fetch = require('node-fetch');

module.exports = function(app) {
//https://cai.neekoi.me/cai?char=lpFOkkM_EHLcW7KF9mEEC4FMZjHUWC3D7DZRvPaGfgo&message=gunakan+bahasa+Indonesia
  // Fungsi untuk ambil jawaban dari AI Neekoi
  async function NeekoiAI(query) {
    const char = "xyn7WSSLqbrnqn4HiQT2exUX2hHzzEgMheVhh5HV38E";
    const url = `https://cai.neekoi.me/cai?char=${char}&message=${encodeURIComponent(query)}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.reply) throw new Error("Tidak ada jawaban dari AI");
    return data.reply;
  }

  // Endpoint tanpa apikey
  app.get('/ai/kaka-perempuan', async (req, res) => {
    try {
      const { text } = req.query;
      if (!text) return res.status(400).json({ status: false, error: "Parameter 'text' wajib diisi" });

      const result = await NeekoiAI(text);
      res.status(200).json({
        status: true,
        type: "kaka perempuan",
        result: result
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
}
