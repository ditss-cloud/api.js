const axios = require('axios');

async function getAllNokos(country) {
    const apiKey = "fsxJrCcuEv4KmQq0tRBIzigVjwSNZh";
    const baseUrl = "https://virtusim.com/api/json.php";
    const url = `${baseUrl}?api_key=${apiKey}&action=services&country=${encodeURIComponent(country || "")}`;

    try {
        console.log("Fetching from:", url);
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            },
            timeout: 10000
        });

        const data = response.data;

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Data nokos kosong atau tidak ditemukan");
        }

        return data;
    } catch (error) {
        console.error('VirtuSim error detail:', error.response?.data || error.message);
        throw new Error('Gagal mengambil data nokos: ' + (error.response?.statusText || error.message));
    }
}

module.exports = function (app) {
    app.get('/random/nokos', async (req, res) => {
        try {
            const { apikey, country } = req.query;
            if (!global.apikey || !global.apikey.includes(apikey)) {
                return res.json({ status: false, creator: "ditss", error: 'Apikey invalid' });
            }

            const result = await getAllNokos(country);
            res.status(200).json({
                status: true,
                creator: "ditss",
                result
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                creator: "ditss",
                error: error.message
            });
        }
    });
};
