const axios = require('axios');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');
const qs = require('qs');

// Daftar tools yang tersedia
const tool = ['removebg', 'enhance', 'upscale', 'restore', 'colorize'];

// Fungsi untuk mendapatkan buffer dari URL
const getBuffer = async (url) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return response.data;
};

// Objek untuk mengelola proses upload dan penggunaan tools
const pxpic = {
  // Fungsi untuk upload file dan mendapatkan URL
  upload: async (filePath) => {
    const buffer = filePath;
    const { ext, mime } = (await fromBuffer(buffer)) || {};
    const fileName = Date.now() + "." + ext;
    const folder = "uploads";

    // Mengambil presigned URL untuk upload ke server
    const responsej = await axios.post("https://pxpic.com/getSignedUrl", { folder, fileName }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { presignedUrl } = responsej.data;

    // Upload file ke presigned URL
    await axios.put(presignedUrl, buffer, {
      headers: {
        "Content-Type": mime,
      },
    });

    // URL file yang sudah diupload
    const cdnDomain = "https://files.fotoenhancer.com/uploads/";
    const sourceFileUrl = cdnDomain + fileName;

    return sourceFileUrl;
  },

  // Fungsi untuk memanggil API dengan tool yang dipilih
  create: async (filePath, tools) => {
    // Validasi apakah tool yang dipilih ada dalam daftar tools
    if (!tool.includes(tools)) {
      return `Pilih salah satu dari tools ini: ${tool.join(', ')}`;
    }

    // Mengupload gambar
    const url = await pxpic.upload(filePath);

    // Menyiapkan data untuk permintaan API
    let data = qs.stringify({
      'imageUrl': url,
      'targetFormat': 'png',
      'needCompress': 'no',
      'imageQuality': '100',
      'compressLevel': '6',
      'fileOriginalExtension': 'png',
      'aiFunction': tools,
      'upscalingLevel': ''
    });

    // Konfigurasi permintaan API
    let config = {
      method: 'POST',
      url: 'https://pxpic.com/callAiFunction',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept-language': 'id-ID'
      },
      data: data
    };

    // Mengirim permintaan API dan mendapatkan hasil
    const api = await axios.request(config);
    return api.data;
  }
}

// Fungsi untuk menangani route API
module.exports = function(app) {
  // Route untuk removebg
  app.get('/imagecreator/removebg', async (req, res) => {
    const { apikey, url } = req.query;
    if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });

    try {
      let image = await getBuffer(url);
      const result = await pxpic.create(image, "removebg");
      res.status(200).json({
        status: true,
        result: result.resultImageUrl
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error: ${error?.message || error}`);
    }
  });

  // Route untuk remaster image (remini)
  app.get('/imagecreator/reminiiii', async (req, res) => {
    const { apikey, url } = req.query;
    if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });

    try {
      let image = await getBuffer(url);
      const result = await pxpic.create(image, "enhance");
      res.status(200).json({
        status: true,
        result: result.resultImageUrl
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error: ${error?.message || error}`);
    }
  });

  // Route untuk upscale image
  app.get('/imagecreator/upscale', async (req, res) => {
    const { apikey, url } = req.query;
    if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });

    try {
      let image = await getBuffer(url);
      const result = await pxpic.create(image, "upscale");
      res.status(200).json({
        status: true,
        result: result.resultImageUrl
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error: ${error?.message || error}`);
    }
  });

  // Route untuk colorize image
  app.get('/imagecreator/colorize', async (req, res) => {
    const { apikey, url } = req.query;
    if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });

    try {
      let image = await getBuffer(url);
      const result = await pxpic.create(image, "colorize");
      res.status(200).json({
        status: true,
        result: result.resultImageUrl
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error: ${error?.message || error}`);
    }
  });
};
