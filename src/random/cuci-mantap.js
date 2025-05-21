const axios = require('axios');


const getBuffer = async (url) => {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    return res.data;
};


async function anim() {
    try {
        const urls = [
  'https://i.pinimg.com/236x/51/01/8c/51018cca3f38a224a15a0d5d20e85b8d.jpg',
  'https://i.pinimg.com/236x/77/6a/9a/776a9a1a1956ebd9873f679a116049c2.jpg',
  'https://i.pinimg.com/236x/c8/57/4b/c8574b3c557246f5464b7bc0c0eb34b3.jpg',
  'https://i.pinimg.com/236x/91/90/35/919035975684cac7c0971ae162e4f808.jpg',
  'https://i.pinimg.com/236x/f0/34/3d/f0343d91c5aabdad73f2965efe35ac6b.jpg',
  'https://i.pinimg.com/736x/3a/dd/a3/3adda3e884df349a2904d55c217a1f35.jpg',
  'https://i.pinimg.com/236x/96/22/bd/9622bd85cebf91b9865d0df88000b783.jpg',
  'https://i.pinimg.com/236x/06/73/10/0673102a1e27d0984a79985b94539b00.jpg',
  'https://i.pinimg.com/236x/5a/16/6e/5a166e6697a09d03293a0a1ca4f1a607.jpg',
  'https://i.pinimg.com/236x/2f/fa/51/2ffa5135bca311185372e35a120ef548.jpg',
  'https://i.pinimg.com/236x/e4/8b/11/e48b11ea7341daaa6dd471ba30db0884.jpg',
  'https://i.pinimg.com/736x/87/c0/12/87c01203fd142ef0f73678c78a7c785f.jpg',
  'https://i.pinimg.com/236x/ed/c5/7b/edc57bf0f9bf4f25b4b7b936786ed29a.jpg',
  'https://i.pinimg.com/236x/01/8d/4e/018d4e562c8b51e9ae795cc807960ff4.jpg',
  'https://i.pinimg.com/236x/5d/5e/c4/5d5ec43167b090f0ad7b290b832411e6.jpg',
  'https://i.pinimg.com/236x/73/a2/1f/73a21f0bf5d3f45be19943b4429a3958.jpg',
  'https://i.pinimg.com/736x/e4/c5/48/e4c548732b32ac35b1b719cf6f5880bf.jpg',
  'https://i.pinimg.com/236x/91/9c/41/919c41c091d9f7128edc480c4b11c45c.jpg',
  'https://i.pinimg.com/736x/d3/57/7b/d3577bd7e9d3d378b4b2e58a182771b4.jpg',
  'https://i.pinimg.com/236x/8f/96/f0/8f96f0a973d2943769128f2506405605.jpg',
  'https://i.pinimg.com/236x/ba/5f/39/ba5f39086683349421dfba5c57dacd15.jpg',
  'https://i.pinimg.com/236x/d3/40/18/d34018fb73d2caec7236aaaa8e0c234f.jpg',
  'https://i.pinimg.com/236x/03/02/3c/03023c7b8fa218bea060cb75ff414448.jpg',
  'https://i.pinimg.com/236x/bf/47/c2/bf47c2d064ef38156c7726977e6380a4.jpg',
  'https://i.pinimg.com/236x/a1/0f/84/a10f84fe14a214b61d7515d07dfceab9.jpg',
  'https://i.pinimg.com/236x/9b/08/10/9b081062ed540cf4ec5c1e70e07863bf.jpg',
  'https://i.pinimg.com/736x/bb/fc/15/bbfc1553acefef9c96394b89d9b7c190.jpg',
  'https://i.pinimg.com/736x/b3/17/9a/b3179ab69052c5d0011e339f4c9d15ee.jpg',
  'https://i.pinimg.com/236x/78/b3/95/78b39538241e11502e9b2a360d894a73.jpg',
  'https://i.pinimg.com/236x/81/df/01/81df015144dc64a0b41f61d42fcd323e.jpg',
  'https://i.pinimg.com/736x/c4/9a/d5/c49ad5027f88fbfc29ae74e76b76b534.jpg',
  'https://i.pinimg.com/236x/be/64/f8/be64f801b978058fd81048a8f50e3abb.jpg',
  'https://i.pinimg.com/236x/a9/ac/bc/a9acbc740773b0cdce86a1a4bedf90ba.jpg',
  'https://i.pinimg.com/236x/5e/27/71/5e27719b9ae456c76f892c5acaba1a94.jpg',
  'https://i.pinimg.com/736x/bf/4a/40/bf4a40a955aa8abdba418d4dd18aaa1f.jpg',
  'https://i.pinimg.com/236x/1a/72/53/1a7253b9a0b73da06e6219b9e52d8d99.jpg',
  'https://i.pinimg.com/236x/93/ea/99/93ea9959ecd73ba2a2945412c93317f4.jpg',
  'https://i.pinimg.com/236x/7c/9b/f8/7c9bf8bf51c5ceda228bb934aefbe7d7.jpg',
  'https://i.pinimg.com/236x/61/33/bb/6133bb7c66afff984755f23fadaea9c1.jpg',
  'https://i.pinimg.com/236x/83/59/4b/83594b936ef9d237fbfc8266e8d71df5.jpg',
  'https://i.pinimg.com/236x/78/6c/40/786c40659375b8c345f81154b52ac665.jpg',
  'https://i.pinimg.com/736x/95/97/7f/95977feaa6c0aa5933dcd8d1cfc870e2.jpg',
  'https://i.pinimg.com/236x/3f/d0/d5/3fd0d516192d8a342ea8fd1cb9a63a01.jpg',
  'https://i.pinimg.com/236x/e6/60/3a/e6603a7c4b724ea99aec5bb44c456ecb.jpg',
  'https://i.pinimg.com/236x/88/c4/dc/88c4dc941a4a90b33b2928ed322b4cf4.jpg',
  'https://i.pinimg.com/736x/d5/5d/57/d55d57399c753b9c9b5716d4df10551c.jpg',
  'https://i.pinimg.com/236x/6c/7a/ea/6c7aead81dba4d61cab33af32e1de533.jpg',
  'https://i.pinimg.com/236x/32/72/ca/3272ca6e8a1f6eb189cf85e106579fae.jpg',
  'https://i.pinimg.com/736x/37/db/ea/37dbea0b50562f21be298567ddb21df5.jpg',
  'https://i.pinimg.com/236x/82/98/7b/82987b609d4051996cb9b2baab5d09a1.jpg',
  'https://i.pinimg.com/736x/50/db/fd/50dbfd285b4fadd3df790854bc45a610.jpg',
  'https://i.pinimg.com/474x/25/9e/20/259e2040c286a2c424215cd8f74e88a3.jpg',
  'https://i.pinimg.com/736x/7d/57/5e/7d575ea4c6c9a72cb8e574d2b1abef80.jpg',
  'https://i.pinimg.com/550x/e9/a6/fc/e9a6fc92611cf59155d755212f8ec3e3.jpg',
  'https://i.pinimg.com/474x/7d/2a/a3/7d2aa330466fb7396fafbcc84493e0fe.jpg',
  'https://i.pinimg.com/236x/08/60/34/08603455b1edbd8b518274e82787e55e.jpg',
  'https://i.pinimg.com/736x/c6/fb/f2/c6fbf255dad9721fae20bd088690d4a1.jpg',
  'https://i.pinimg.com/236x/2f/e2/62/2fe262473be23fbb19d07348185eb23b.jpg',
  'https://i.pinimg.com/474x/14/35/61/143561353a632376900769d54fe41fd8.jpg',
  'https://i.pinimg.com/236x/a5/05/0e/a5050ecc7aa51c1caaa73a73e03361ec.jpg',
  'https://i.pinimg.com/236x/9a/f6/28/9af628579c891b6c165cd9767a532fd9.jpg',
  'https://i.pinimg.com/736x/13/3a/1c/133a1cc85a9a841056ecd8778bbada87.jpg',
  'https://i.pinimg.com/236x/32/f5/42/32f542a975c012cb585b86ddef1217a1.jpg',
  'https://i.pinimg.com/236x/54/7f/a2/547fa262bd09a5de14d7378d3ec9eb92.jpg',
  'https://i.pinimg.com/236x/6b/5c/9a/6b5c9a65ac91e99e642bfc68114bc889.jpg',
  'https://i.pinimg.com/736x/f0/ed/b1/f0edb1cca3a57413b73cafdee92789a5.jpg',
  'https://i.pinimg.com/236x/e9/9f/04/e99f049c8e8b7817ad016eac7d58cd1f.jpg',
  'https://i.pinimg.com/236x/6a/7b/65/6a7b65a6708d5f88daf25a5c6a336847.jpg',
  'https://i.pinimg.com/236x/a1/21/0a/a1210a3d58a5867a11f4a133170aa563.jpg',
  'https://i.pinimg.com/236x/66/bc/fc/66bcfc5a83980f87e534c8b426c286a0.jpg',
  'https://i.pinimg.com/236x/b0/de/cd/b0decdceedb3ff00d82f382a99d57633.jpg',
  'https://i.pinimg.com/236x/7f/73/51/7f7351ccc3c354d446965660e1f5fac1.jpg',
  'https://i.pinimg.com/236x/63/50/8d/63508d60b6a76afcd7bedab8e90f6131.jpg',
  'https://i.pinimg.com/736x/44/fc/bf/44fcbf9470c1f24914d5bc29f6d015a2.jpg',
  'https://i.pinimg.com/236x/46/7a/db/467adb28755dfa1259df3fa738ad9c98.jpg',
  'https://i.pinimg.com/474x/ae/61/54/ae6154f0a82cb4b6dbe73900f4603610.jpg',
  'https://i.pinimg.com/736x/ba/40/7b/ba407bbd1ec8869e57554d2cdf6f9364.jpg',
  'https://i.pinimg.com/236x/dd/7c/6c/dd7c6ca296835bf63369f4d97bfa0e75.jpg',
  'https://i.pinimg.com/236x/39/ac/cf/39accf637179fb32389aa9af37abb389.jpg',
  'https://i.pinimg.com/236x/54/22/8f/54228ff0aed771bd506d9fb184ea774b.jpg',
  'https://i.pinimg.com/736x/79/c5/78/79c5783e5d7418c4a832f83e770c3b2e.jpg',
  'https://i.pinimg.com/736x/18/14/9f/18149f1a442e18f215d4cdbaac27bccc.jpg',
  'https://i.pinimg.com/originals/6f/47/fe/6f47fe9f31795c3c88ba718485b9a243.jpg',
  'https://i.pinimg.com/236x/b9/52/31/b95231af720c6ce632df3d8c2fc8c954.jpg',
  'https://i.pinimg.com/736x/72/85/8d/72858d05dde0410bf01e6fadbc923165.jpg',
  'https://i.pinimg.com/236x/fd/d2/be/fdd2be8db14f73f36600be1d286049a2.jpg',
  'https://i.pinimg.com/236x/ab/70/b4/ab70b44925a1f79d79eb34932239823b.jpg',
  'https://i.pinimg.com/736x/35/b6/f6/35b6f674b58869a66d3d43e7cb766f34.jpg',
  'https://i.pinimg.com/474x/e2/5e/02/e25e02b855ffbe5b2012fae5b50ad420.jpg',
  'https://i.pinimg.com/236x/00/4e/99/004e995542c35f4f547baf66b1853be2.jpg',
  'https://i.pinimg.com/236x/bc/2c/d7/bc2cd7e17c33bd27575eaf350c52c353.jpg',
  'https://i.pinimg.com/236x/6e/c2/d4/6ec2d463c806039f59da982b043ab973.jpg',
  'https://i.pinimg.com/736x/14/97/c5/1497c539faeb411657a1a20efc88c393.jpg',
  'https://i.pinimg.com/736x/ff/69/51/ff69519ac3d1858763de626de1d9b734.jpg',
  'https://i.pinimg.com/736x/0e/f3/04/0ef3049296544f0aee3f2690957f3c9d.jpg',
  'https://i.pinimg.com/236x/89/50/ae/8950ae293c2f6a99aa6f6d24acfbbbe9.jpg',
  'https://i.pinimg.com/236x/11/63/a0/1163a0a81d0152843001859cad846ef8.jpg',
  'https://i.pinimg.com/564x/57/8e/de/578edef3f9b88f145b636227d732b69f.jpg',
  'https://i.pinimg.com/236x/8d/e1/53/8de153643291014dc149e2bbc9b0e855.jpg',
  'https://i.pinimg.com/736x/81/65/ee/8165eefb0ea603fbf9afb12420ba6f05.jpg'
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
    app.get('/random/cucimata', async (req, res) => {
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
