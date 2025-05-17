const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.get('/api/igstalk', async (req, res) => {
    const { username } = req.query;
    if (!username) return res.status(400).json({ status: false, message: "Missing username parameter" });

    try {
        const response = await axios.get(`https://www.instagram.com/${username}/`);
        const $ = cheerio.load(response.data);
        const script = $('script[type="application/ld+json"]').html();
        const json = JSON.parse(script);

        res.json({
            status: true,
            result: {
                username: json.alternateName.replace('@', ''),
                name: json.name,
                bio: json.description,
                profile: json.image,
                url: json.url
            }
        });
    } catch (e) {
        res.status(500).json({ status: false, message: "Failed to fetch profile. Make sure the username is correct or account is public." });
    }
});

module.exports = app;
