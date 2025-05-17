const axios = require('axios');

// Fungsi ambil semua data dari VirtuSim
async function getAllNokos(country) {
    const VIRTUSIM_API_KEY = "fsxJrCcuEv4KmQq0tRBIzigVjwSNZh";
    const VIRTUSIM_BASE_URL = "https://virtusim.com/api/json.php";

    try {
        console.log(`Fetching all nokos for country: ${country}`);
        const response = await axios.get(VIRTUSIM_BASE_URL, {
            params: {
                api_key: VIRTUSIM_API_KEY,
                action: "services",
                country: country || ""
            }
        });

        const list = response.data;
        if (!Array.isArray(list) || list.length === 0) {
            throw new Error("Data nokos kosong atau tidak ditemukan");
        }

        return list;
    } catch (error) {
        console.error('Error fetching nokos:', error.message);
        throw new Error('Gagal mengambil data nokos');
    }
}

module.exports = function (app) {
    app.get('/random/nokos', async (req, res) => {
        try {
            const { apikey, country } = req.query;
            if (!global.apikey || !global.apikey.includes(apikey)) {
                return res.json({ status: false, error: 'Apikey invalid' });
            }

            const result = await getAllNokos(country);

            res.status(200).json({
                status: true,
                result
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
