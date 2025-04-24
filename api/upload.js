const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const router = express.Router();
const upload = multer({ dest: 'temp/' });

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'ditss-dev'; // ganti sesuai username GitHub kamu
const REPO = 'namarepo';   // ganti sesuai nama repo
const BRANCH = 'main';     // cabang default
const FOLDER = 'img';      // folder target di repo

router.post('/', upload.single('image'), async (req, res) => {
  const file = req.file;
  const content = fs.readFileSync(file.path, { encoding: 'base64' });
  const fileName = file.originalname;
  const repoPath = `${FOLDER}/${fileName}`;

  try {
    const response = await axios.put(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${repoPath}`,
      {
        message: `Upload ${fileName}`,
        content,
        branch: BRANCH
      },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );
    // File public URL
    const url = `https://ditss.cloud/${FOLDER}/${fileName}`;
    res.json({ url });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Upload gagal' });
  } finally {
    fs.unlinkSync(file.path);
  }
});

module.exports = router;
