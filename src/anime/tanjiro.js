const axios = require('axios');


const getBuffer = async (url) => {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    return res.data;
};


async function anim() {
    try {
        const urls = [ 
        "https://ditss.cloud/media/mb3l3jyg.jpg",
        "https://ditss.cloud/media/mb3l8dmz.jpg",
        "https://ditss.cloud/media/mb3l8dst.jpg",
        "https://ditss.cloud/media/mb3l8e5i.jpg",
        "https://ditss.cloud/media/mb3l9lfn.jpg",
        "https://ditss.cloud/media/mb3la6u0.jpg",
        "https://ditss.cloud/media/mb3lb32e.jpg",
        "https://ditss.cloud/media/mb3lcai5.jpg",
        "https://ditss.cloud/media/mb3ldey5.jpg",
        "https://ditss.cloud/media/mb3liuog.jpg",
        "https://ditss.cloud/media/mb3liuvu.jpg",
        "https://ditss.cloud/media/mb3liviu.jpg",
        "https://ditss.cloud/media/mb3lkllr.jpg",
        "https://ditss.cloud/media/mb3llj9c.jpg",
        "https://ditss.cloud/media/mb3luyvz.jpg",
        "https://ditss.cloud/media/mb3luz31.jpg",
        "https://ditss.cloud/media/mb3lv8lm.jpg",
        "https://ditss.cloud/media/mb3lxwzu.jpg",
        "https://ditss.cloud/media/mb3ly051.jpg",
        "https://ditss.cloud/media/mb3ly91z.jpg",
        "https://ditss.cloud/media/mb3lycbp.jpg",
        "https://ditss.cloud/media/mb3lyton.jpg"
    ]

        const randomUrl = urls[Math.floor(Math.random() * urls.length)];
        const response = await getBuffer(randomUrl);
        return response;
    } catch (error) {
        throw error;
    }
}

// Export router
module.exports = function app(app) {
    app.get('/anime/tanjiro-kamado', async (req, res) => {
        try {
            
            const buffer = await anim();
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': buffer.length,
            });
            res.end(buffer);
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    });
};
