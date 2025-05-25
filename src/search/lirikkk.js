const axios = require("axios")
const cheerio = require("cheerio")

async function lirikLagu(query) {
  try {
    const { data } = await axios.get("https://songsear.ch/q/" + encodeURIComponent(query));
    const $ = cheerio.load(data);

    const result = {
      title: $("div.results > div:nth-child(1) > .head > h3 > b").text() + " - " + $("div.results > div:nth-child(1) > .head > h2 > a").text(),
      album: $("div.results > div:nth-child(1) > .head > p").text(),
      number: $("div.results > div:nth-child(1) > .head > a").attr("href").split("/")[4],
      thumb: $("div.results > div:nth-child(1) > .head > a > img").attr("src")
    }

    const { data: lyricData } = await axios.get(`https://songsear.ch/api/song/${result.number}?text_only=true`)
    const lyrics = lyricData.song.text_html
      .replace(/<br\/>/g, "\n")
      .replace(/&#x27;/g, "'")

    return {
      status: true,
      result: {
        title: result.title,
        album: result.album,
        thumb: result.thumb,
        lyrics
      }
    }

  } catch (error) {
    return {
      status: false,
      message: "Lagu tidak ditemukan atau terjadi error saat mengambil data."
    }
  }
}

module.exports = function (app) {
  app.get('/search/lirik', async (req, res) => {
    const { apikey, q } = req.query
    if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' })
    if (!q) return res.json({ status: false, error: 'Parameter q (query lagu) wajib diisi' })

    const hasil = await lirikLagu(q)
    if (!hasil.status) return res.status(500).json(hasil)

    res.json(hasil)
  })
}
