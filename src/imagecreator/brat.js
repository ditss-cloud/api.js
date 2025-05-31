const axios = require('axios');

module.exports = function app(app) {
    app.get('/imagecreator/brat', async (req, res) => {
        try {
            const { apikey, text } = req.query;
            if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });
            if (!text) return res.json({ status: false, error: 'Text is required' });

            let pedo;
            try {
                pedo = await getBuffer(`https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(text)}`);
            } catch (err) {
                console.warn('[WARN] API utama gagal, mencoba API kedua...');
                pedo = await getBuffer(`https://anabot.my.id/api/maker/brat?text=${encodeURIComponent(text)}&apikey=freeApikey`);
            }

            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': pedo.length,
            });
            res.end(pedo);
        } catch (error) {
            console.error(error);
            res.status(500).send(`Error: ${error.message}`);
        }
    });

    app.get('/imagecreator/bratvideo', async (req, res) => {
        try {
            const { apikey, text } = req.query;
            if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });
            if (!text) return res.json({ status: false, error: 'Text is required' });

            const pedo = await getBuffer(`https://skyzxu-brat.hf.space/brat-animated?text=${encodeURIComponent(text)}`);
            res.writeHead(200, {
                'Content-Type': 'video/mp4',
                'Content-Length': pedo.length,
            });
            res.end(pedo);
        } catch (error) {
            console.error(error);
            res.status(500).send(`Error: ${error.message}`);
        }
    });
};

async function getBuffer(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(response.data);
    } catch (error) {
        throw new Error('Failed to fetch buffer from URL');
    }
}
