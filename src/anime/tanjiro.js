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
        "https://ditss.cloud/media/mb3lyton.jpg",
        "https://ditss.cloud/media/mb3mnviw.jpg",
        "https://ditss.cloud/media/mb3mqhep.jpg",
        "https://ditss.cloud/media/mb3mql81.jpg",
        "https://ditss.cloud/media/mb3mqtzx.jpg",
        "https://ditss.cloud/media/mb3mqy83.jpg",
        "https://ditss.cloud/media/mb3mr3nt.jpg",
        "https://ditss.cloud/media/mb3mr74r.jpg",
        "https://ditss.cloud/media/mb3mrcat.jpg",
        "https://ditss.cloud/media/mb3mrfu6.jpg",
        "https://ditss.cloud/media/mb3mrj33.jpg",
        "https://ditss.cloud/media/mb3mrm8n.jpg",
        "https://ditss.cloud/media/mb3mrpff.jpg",
        "https://ditss.cloud/media/mb3mrx65.jpg",
        "https://ditss.cloud/media/mb3ms3c7.jpg",
        "https://ditss.cloud/media/mb3ms6ky.jpg",
        "https://ditss.cloud/media/mb3ms9hh.jpg",
        "https://ditss.cloud/media/mb3mscln.jpg",
        "https://ditss.cloud/media/mb3msfuy.jpg",
        "https://ditss.cloud/media/mb3mslk0.jpg",
        "https://ditss.cloud/media/mb3msono.jpg",
        "https://ditss.cloud/media/mb3mswky.jpg",
        "https://ditss.cloud/media/mb3mszl4.jpg",
        "https://ditss.cloud/media/mb3mt2ty.jpg",
        "https://ditss.cloud/media/mb3mt5lx.jpg",
        "https://ditss.cloud/media/mb3mt8jp.jpg",
        "https://ditss.cloud/media/mb3mtbg7.jpg",
        "https://ditss.cloud/media/mb3mthmw.jpg",
        "https://ditss.cloud/media/mb3mtjxi.jpg",
        "https://ditss.cloud/media/mb3mtp8o.jpg",
        "https://ditss.cloud/media/mb3mtshv.jpg",
        "https://ditss.cloud/media/mb3mv8nv.jpg"
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
