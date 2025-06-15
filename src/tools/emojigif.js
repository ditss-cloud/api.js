const axios = require('axios')

module.exports = function (app) {
  app.get('/tools/emojitogif', async (req, res) => {
    const { emoji, apikey } = req.query

    if (!global.apikey.includes(apikey)) {
      return res.status(403).json({ status: false, error: 'Apikey invalid' })
    }

    if (!emoji) {
      return res.status(400).json({ status: false, error: 'Emoji tidak boleh kosong' })
    }

    try {
      const result = await axios.get('https://tenor.googleapis.com/v2/search', {
        params: {
          q: emoji,
          key: 'AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ', // pakai API key Tenor
          media_filter: 'gif',
          limit: 1
        }
      })

      const gifUrl = result?.data?.results?.[0]?.media_formats?.gif?.url
      if (!gifUrl) {
        return res.status(404).json({ status: false, error: 'GIF tidak ditemukan' })
      }

      const gifBuffer = (await axios.get(gifUrl, { responseType: 'arraybuffer' })).data

      res.writeHead(200, {
        'Content-Type': 'image/gif',
        'Content-Length': gifBuffer.length
      })
      res.end(gifBuffer)
    } catch (err) {
      res.status(500).json({
        status: false,
        error: 'Gagal mengambil GIF dari Tenor',
        detail: err.message
      })
    }
  })
}
