const fetch = require('node-fetch');

const DATA_URL = 'https://raw.githubusercontent.com/ditss-dev/database/main/game/asahotak.json';

module.exports = function(app) {
  app.get('/api/game', async (req, res) => {
    try {
      const response = await fetch(DATA_URL);
      if (!response.ok) throw new Error('Gagal ambil data dari GitHub');
      const soal = await response.json();
      const data = soal[Math.floor(Math.random() * soal.length)];
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
