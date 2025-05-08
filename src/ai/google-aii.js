const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = function(app) {
  const genAI = new GoogleGenerativeAI({
    apiKey: "AIzaSyDfus4GYMbqHtuA4pe61TU2XBsnj3EXl6Q" // Gantilah dengan API key Anda.
  });

  async function generateResponse(prompt) {
    try {
      // Mendapatkan model generatif
      const model = await genAI.getModel({
        model: "gemini-1.5-flash" // Pastikan model ini tersedia di akun Anda
      });

      // Menghasilkan konten berdasarkan prompt
      const result = await model.generateText({
        prompt: prompt,
        temperature: 0.7, // Parameter opsional untuk mengatur kreativitas respons
        maxOutputTokens: 200 // Tentukan jumlah maksimal token
      });

      return result.text;
    } catch (error) {
      throw new Error(`Error generating response: ${error.message}`);
    }
  }

  app.get('/ai/google-ai', async (req, res) => {
    try {
      const { text, apikey } = req.query;

      // Validasi API key
      if (!global.apikey.includes(apikey)) {
        return res.status(403).json({ status: false, error: 'Apikey invalid' });
      }

      // Memproses permintaan dengan prompt
      const response = await generateResponse(text);

      res.status(200).json({
        status: true,
        result: response
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
