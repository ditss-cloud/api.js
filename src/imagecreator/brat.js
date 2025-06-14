const axios = require('axios');

module.exports = function app(app) {
    // Endpoint Gambar BRAT
    app.get('/imagecreator/brat', async (req, res) => {
        try {
            const { apikey, text } = req.query;
            if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });
            if (!text) return res.json({ status: false, error: 'Text is required' });

            const encodedText = encodeURIComponent(text);
            const urls = [
                `https://brat.caliphdev.com/api/brat?text=${encodedText}`,
                `https://anabot.my.id/api/maker/brat?text=${encodedText}&apikey=freeApikey`,
                `https://aqul-brat.hf.space/?text=${encodedText}`
            ];

            let imageBuffer = null;

            for (let url of urls) {
                try {
                    console.log(`[INFO] Mencoba URL: ${url}`);
                    imageBuffer = await getBuffer(url);
                    if (imageBuffer) {
                        console.log('[SUCCESS] Gambar berhasil diambil.');
                        break;
                    }
                } catch (err) {
                    console.warn(`[WARN] Gagal mengambil gambar dari: ${url}`);
                }
            }

            if (!imageBuffer) {
                return res.status(500).json({ status: false, error: 'Semua API gagal digunakan.' });
            }

            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': imageBuffer.length,
            });
            res.end(imageBuffer);

        } catch (error) {
            console.error('[ERROR] ' + error.message);
            res.status(500).send(`Error: ${error.message}`);
        }
    });

    // Endpoint Video BRAT (tanpa fallback, hanya 1 API)
    app.get('/imagecreator/bratvideo', async (req, res) => {
        try {
            const { apikey, text } = req.query;
            if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });
            if (!text) return res.json({ status: false, error: 'Text is required' });

            const videoBuffer = await getBuffer(`https://skyzxu-brat.hf.space/brat-animated?text=${encodeURIComponent(text)}`);

            res.writeHead(200, {
                'Content-Type': 'video/mp4',
                'Content-Length': videoBuffer.length,
            });
            res.end(videoBuffer);

        } catch (error) {
            console.error('[ERROR] ' + error.message);
            res.status(500).send(`Error: ${error.message}`);
        }
    });
};

// Fungsi getBuffer universal
async function getBuffer(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(response.data);
    } catch (error) {
        throw new Error(`Failed to fetch buffer from URL: ${url}`);
    }
}
