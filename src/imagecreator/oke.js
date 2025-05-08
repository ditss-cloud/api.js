const axios = require('axios');
const { fromBuffer } = require('file-type');
const { ImageUploadService } = require('node-upload-images');

const uploader = new ImageUploadService();

const vredenAPI = {
  upload: async (buffer) => {
    const { ext } = (await fromBuffer(buffer)) || {};
    const fileName = `${Date.now()}.${ext || 'jpg'}`;

    const result = await uploader.uploadImageFromBuffer(buffer, fileName);
    if (!result?.url) throw new Error('Gagal upload gambar');

    return result.url;
  },

  enhance: async (buffer) => {
    const imageUrl = await vredenAPI.upload(buffer);
    const endpoint = `https://api.vreden.my.id/api/artificial/hdr?url=${encodeURIComponent(imageUrl)}&pixel=4`;

    const res = await axios.get(endpoint);
    return res.data;
  }
};

module.exports = function (app) {
  app.get('/imagecreator/remini-vreden', async (req, res) => {
    const { apikey, url } = req.query;
    if (!global.apikey.includes(apikey)) {
      return res.json({ status: false, error: 'Apikey invalid' });
    }

    try {
      const image = await getBuffer(url);
      const result = await vredenAPI.enhance(image);

      if (!result.status) {
        return res.status(500).json({ status: false, error: 'Gagal memproses gambar' });
      }

      res.status(200).json({
        status: true,
        result: result.result
      });
    } catch (err) {
      res.status(500).send(`Error: ${err.message}`);
    }
  });
};
