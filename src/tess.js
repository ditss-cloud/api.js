const fetch = require('node-fetch');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // isi di env Vercel
const OWNER = 'ditss-dev';
const REPO = 'akses';
const FILE_PATH = 'user.json';
const API_SECRET = process.env.API_SECRET || 'contoh_secret'; // proteksi sederhana

async function getJsonFile() {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
  });
  if (!res.ok) throw new Error('Gagal fetch file dari GitHub');
  const data = await res.json();
  return {
    sha: data.sha,
    list: JSON.parse(Buffer.from(data.content, 'base64').toString())
  };
}

async function updateJsonFile(newList, sha) {
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: `Add nomor baru via API`,
      content: Buffer.from(JSON.stringify(newList, null, 2)).toString('base64'),
      sha
    })
  });
  if (!res.ok) throw new Error('Gagal push ke GitHub');
  return res.json();
}

module.exports = async (req, res) => {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const { number, secret } = req.body;
  if (!number) return res.status(400).json({ error: 'Nomor wajib diisi' });
  if (secret !== API_SECRET)
    return res.status(401).json({ error: 'API secret salah' });

  try {
    const { sha, list } = await getJsonFile();
    if (list.includes(number))
      return res.status(409).json({ error: 'Nomor sudah terdaftar' });

    list.push(number);
    await updateJsonFile(list, sha);

    return res.status(200).json({ message: 'Nomor berhasil ditambahkan', number });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
