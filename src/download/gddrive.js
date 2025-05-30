const axios = require("axios")
const cheerio = require("cheerio")

// Fungsi buat ambil ID dari link/full URL
function extractDriveId(input) {
  const regex = /(?:\/d\/|id=|open\?id=)([a-zA-Z0-9_-]{10,})/
  const match = input.match(regex)
  return match ? match[1] : input // kalau input langsung ID, tetap dipakai
}

// Downloader Google Drive
async function gddriveDownloader(input) {
  const fileId = extractDriveId(input)
  const url = `https://drive.google.com/uc?export=download&id=${fileId}`

  const res = await axios.get(url)
  const $ = cheerio.load(res.data)

  const confirmToken = $('form').attr('action')?.match(/confirm=([a-zA-Z0-9\-_]+)/)?.[1]
  const fileName = $('span.uc-name-size').text().split('(')[0]?.trim() || 'Unknown'
  const fileSize = $('span.uc-name-size').text().split('(')[1]?.replace(')', '')?.trim() || 'Unknown'

  let finalDownload = url
  if (confirmToken) {
    finalDownload = `https://drive.google.com/uc?export=download&confirm=${confirmToken}&id=${fileId}`
  }

  return {
    name: fileName,
    size: fileSize,
    downloadUrl: finalDownload,
    id: fileId
  }
}

// Route API
module.exports = function (app) {
  app.get('/gddrive', async (req, res) => {
    const { apikey, id } = req.query
    if (!global.apikey?.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' })
    if (!id) return res.json({ status: false, error: 'Parameter ?id= wajib diisi (ID/URL Google Drive)' })

    try {
      const result = await gddriveDownloader(id)
      res.status(200).json({
        status: true,
        result
      })
    } catch (err) {
      res.status(500).json({
        status: false,
        error: 'Gagal mengambil data Google Drive',
        detail: err.message
      })
    }
  })
}
