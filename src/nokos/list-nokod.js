const fetch = require('node-fetch');

module.exports = function (app) {

  // Fungsi ambil daftar nokos dari VirtuSim
  async function getNokosVirtusim(country) {
    if (!country) throw new Error("Parameter 'country' wajib diisi");
    const VIRTUSIM_API_KEY = "fsxJrCcuEv4KmQq0tRBIzigVjwSNZh";
    const VIRTUSIM_API_URL = "https://virtusim.com/api/json.php";
    const url = `${VIRTUSIM_API_URL}?api_key=${VIRTUSIM_API_KEY}&action=services&country=${encodeURIComponent(country)}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  // Endpoint: /api/nokos (POST, body: { country })
  app.post('/api/nokos', async (req, res) => {
    try {
      const { country } = req.body;
      if (!country) {
        return res.status(400).json({ status: false, error: "Parameter 'country' wajib diisi" });
      }
      const result = await getNokosVirtusim(country);
      res.status(200).json({
        status: true,
        result
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
}
