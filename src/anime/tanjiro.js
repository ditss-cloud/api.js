const axios = require('axios');


const getBuffer = async (url) => {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    return res.data;
};


async function anim() {
    try {
        const urls = [ 
        "https://api.ditss.cloud/media/mb3l3jyg.jpg",
        "https://api.ditss.cloud/media/mb3l8dmz.jpg",
        "https://api.ditss.cloud/media/mb3l8dst.jpg",
        "https://api.ditss.cloud/media/mb3l8e5i.jpg",
        "https://api.ditss.cloud/media/mb3l9lfn.jpg",
        "https://api.ditss.cloud/media/mb3la6u0.jpg",
        "https://api.ditss.cloud/media/mb3lb32e.jpg",
        "https://api.ditss.cloud/media/mb3lcai5.jpg",
        "https://api.ditss.cloud/media/mb3ldey5.jpg",
        "https://api.ditss.cloud/media/mb3liuog.jpg",
        "https://api.ditss.cloud/media/mb3liuvu.jpg",
        "https://api.ditss.cloud/media/mb3liviu.jpg",
        "https://api.ditss.cloud/media/mb3lkllr.jpg",
        "https://api.ditss.cloud/media/mb3llj9c.jpg",
        "https://api.ditss.cloud/media/mb3luyvz.jpg",
        "https://api.ditss.cloud/media/mb3luz31.jpg",
        "https://api.ditss.cloud/media/mb3lv8lm.jpg",
        "https://api.ditss.cloud/media/mb3lxwzu.jpg",
        "https://api.ditss.cloud/media/mb3ly051.jpg",
        "https://api.ditss.cloud/media/mb3ly91z.jpg",
        "https://api.ditss.cloud/media/mb3lycbp.jpg",
        "https://api.ditss.cloud/media/mb3lyton.jpg",
        "https://api.ditss.cloud/media/mb3mnviw.jpg",
        "https://api.ditss.cloud/media/mb3mqhep.jpg",
        "https://api.ditss.cloud/media/mb3mql81.jpg",
        "https://api.ditss.cloud/media/mb3mqtzx.jpg",
        "https://api.ditss.cloud/media/mb3mqy83.jpg",
        "https://api.ditss.cloud/media/mb3mr3nt.jpg",
        "https://api.ditss.cloud/media/mb3mr74r.jpg",
        "https://api.ditss.cloud/media/mb3mrcat.jpg",
        "https://api.ditss.cloud/media/mb3mrfu6.jpg",
        "https://api.ditss.cloud/media/mb3mrj33.jpg",
        "https://api.ditss.cloud/media/mb3mrm8n.jpg",
        "https://api.ditss.cloud/media/mb3mrpff.jpg",
        "https://api.ditss.cloud/media/mb3mrx65.jpg",
        "https://api.ditss.cloud/media/mb3ms3c7.jpg",
        "https://api.ditss.cloud/media/mb3ms6ky.jpg",
        "https://api.ditss.cloud/media/mb3ms9hh.jpg",
        "https://api.ditss.cloud/media/mb3mscln.jpg",
        "https://api.ditss.cloud/media/mb3msfuy.jpg",
        "https://api.ditss.cloud/media/mb3mslk0.jpg",
        "https://api.ditss.cloud/media/mb3msono.jpg",
        "https://api.ditss.cloud/media/mb3mswky.jpg",
        "https://api.ditss.cloud/media/mb3mszl4.jpg",
        "https://api.ditss.cloud/media/mb3mt2ty.jpg",
        "https://api.ditss.cloud/media/mb3mt5lx.jpg",
        "https://api.ditss.cloud/media/mb3mt8jp.jpg",
        "https://api.ditss.cloud/media/mb3mtbg7.jpg",
        "https://api.ditss.cloud/media/mb3mthmw.jpg",
        "https://api.ditss.cloud/media/mb3mtjxi.jpg",
        "https://api.ditss.cloud/media/mb3mtp8o.jpg",
        "https://api.ditss.cloud/media/mb3mtshv.jpg",
        "https://api.ditss.cloud/media/mb3mv8nv.jpg",
        "https://api.ditss.cloud/media/mb4wpahi.jpg",
        "https://api.ditss.cloud/media/mb4wpau2.jpg",
        "https://api.ditss.cloud/media/mb4wpdut.jpg",
        "https://api.ditss.cloud/media/mb4wphea.jpg",
        "https://api.ditss.cloud/media/mb4wpnq3.jpg",
        "https://api.ditss.cloud/media/mb4wpr6s.jpg",
        "https://api.ditss.cloud/media/mb4wpuhs.jpg",
        "https://api.ditss.cloud/media/mb4wpym1.jpg",
        "https://api.ditss.cloud/media/mb4wq1w3.jpg",
        "https://api.ditss.cloud/media/mb4wq5b7.jpg",
        "https://api.ditss.cloud/media/mb4wqckb.jpg",
        "https://api.ditss.cloud/media/mb4wqfns.jpg",
        "https://api.ditss.cloud/media/mb4wqjo4.jpg",
        "https://api.ditss.cloud/media/mb4wqs0v.jpg",
        "https://api.ditss.cloud/media/mb4wqtrj.jpg",
        "https://api.ditss.cloud/media/mb4wqwzm.jpg",
        "https://api.ditss.cloud/media/mb4wr120.jpg",
        "https://api.ditss.cloud/media/mb4wr474.jpg",
        "https://api.ditss.cloud/media/mb4wr6mx.jpg",
        "https://api.ditss.cloud/media/mb4wrdf1.jpg",
        "https://api.ditss.cloud/media/mb4wrnc4.jpg",
        "https://api.ditss.cloud/media/mb4wrz7n.jpg",
        "https://files.catbox.moe/j3e49w.jpg",
        "https://api.ditss.cloud/media/mb4ws83m.jpg",
        "https://https://api.ditss.cloud/media/mb4wsey3.jpg",
        "https://https://api.ditss.cloud/media/mb4wsj48.jpg",
        "https://https://api.ditss.cloud/media/mb4wsmvf.jpg",
        "https://https://api.ditss.cloud/media/mb4wsq3x.jpg",
        "https://https://api.ditss.cloud/media/mb4wst53.jpg",
        "https://https://api.ditss.cloud/media/mb4wsw92.jpg",
        "https://https://api.ditss.cloud/media/mb4wszqh.jpg",
        "https://https://api.ditss.cloud/media/mb4wt38l.jpg",
        "https://https://api.ditss.cloud/media/mb4wt6e6.jpg",
        "https://https://api.ditss.cloud/media/mb4wt9ah.jpg",
        "https://https://api.ditss.cloud/media/mb4wtgw9.jpg",
        "https://https://api.ditss.cloud/media/mb4wtmpw.jpg",
        "https://https://api.ditss.cloud/media/mb4wtovn.jpg",
        "https://https://api.ditss.cloud/media/mb4wtrrk.jpg",
        "https://https://api.ditss.cloud/media/mb4wufky.jpg",
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
