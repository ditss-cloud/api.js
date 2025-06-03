const axios = require('axios');
const FileType = require('file-type');
const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metode hanya POST' });
  }

  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) throw new Error('Gagal parsing form');

      const apikey = fields.apikey?.[0];
      const media = files.media?.[0];

      if (!global.apikey || !global.apikey.includes(apikey)) {
        return res.status(403).json({ status: false, error: 'Apikey invalid' });
      }

      if (!media) {
        return res.status(400).json({ error: 'File media tidak ditemukan' });
      }

      const buffer = fs.readFileSync(media.path);
      const type = await FileType.fromBuffer(buffer);
      const ext = type?.ext || path.extname(media.originalFilename).slice(1) || 'bin';
      const mime = type?.mime || media.headers['content-type'];
      const filename = `${Date.now().toString(36)}.${ext}`;
      const contentBase64 = buffer.toString('base64');

      if (!/image|video|audio|webp/.test(mime)) {
        return res.status(400).json({ error: 'File bukan media yang valid' });
      }

      const githubToken = process.env.GITHUB_TOKEN || 'ghp_xxxxx';
      const owner = 'ditss-dev';
      const repo = 'database';
      const branch = 'main';
      const apiURL = `https://api.github.com/repos/${owner}/${repo}/contents/${filename}`;

      await axios.put(apiURL, {
        message: `Upload via API: ${filename}`,
        content: contentBase64,
        branch,
      }, {
        headers: {
          Authorization: `token ${githubToken}`,
          'User-Agent': 'ditss-api',
          Accept: 'application/vnd.github+json',
        },
      });

      const cdnURL = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filename}`;
      res.status(200).json({ status: true, url: cdnURL, type: mime, ext });

      fs.unlinkSync(media.path);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Gagal upload media', detail: e.message });
    }
  });
};
