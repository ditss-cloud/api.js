const axios = require('axios');


const getBuffer = async (url) => {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    return res.data;
};


async function anim() {
    try {
        const urls = [
  'https://i.pinimg.com/236x/c8/57/4b/c8574b3c557246f5464b7bc0c0eb34b3.jpg',
  'https://i.pinimg.com/236x/f0/34/3d/f0343d91c5aabdad73f2965efe35ac6b.jpg',
  'https://i.pinimg.com/236x/96/22/bd/9622bd85cebf91b9865d0df88000b783.jpg',
  'https://i.pinimg.com/236x/5a/16/6e/5a166e6697a09d03293a0a1ca4f1a607.jpg',
  'https://i.pinimg.com/736x/3a/dd/a3/3adda3e884df349a2904d55c217a1f35.jpg',
  'https://i.pinimg.com/236x/e6/60/3a/e6603a7c4b724ea99aec5bb44c456ecb.jpg',
  'https://i.pinimg.com/236x/00/12/5e/00125e1a9b3d0cf00faa7770e8e8e642.jpg',
  'https://i.pinimg.com/236x/2f/fa/51/2ffa5135bca311185372e35a120ef548.jpg',
  'https://i.pinimg.com/236x/bf/47/c2/bf47c2d064ef38156c7726977e6380a4.jpg',
  'https://i.pinimg.com/236x/a9/ac/bc/a9acbc740773b0cdce86a1a4bedf90ba.jpg',
  'https://i.pinimg.com/236x/e4/8b/11/e48b11ea7341daaa6dd471ba30db0884.jpg',
  'https://i.pinimg.com/736x/c8/57/4b/c8574b3c557246f5464b7bc0c0eb34b3.jpg',
  'https://i.pinimg.com/474x/35/86/f9/3586f953aee082affae640c59cdcc8bc.jpg',
  'https://i.pinimg.com/736x/a0/ca/c9/a0cac9be9bd1e0be7806107f8424177f.jpg',
  'https://i.pinimg.com/736x/09/36/80/0936808bb3f3e6f6a5a86c919f0640b5.jpg',
  'https://i.pinimg.com/736x/72/2f/29/722f29bb04a683c4b7cf627867ca7073.jpg',
  'https://i.pinimg.com/474x/e2/5e/02/e25e02b855ffbe5b2012fae5b50ad420.jpg',
  'https://i.pinimg.com/736x/b5/3c/cc/b53ccc36ee2aff3a593fb6043179725f.jpg',
  'https://i.pinimg.com/564x/b9/8f/00/b98f00d5e501cdb808a6767d69a7c529.jpg',
  'https://i.pinimg.com/736x/30/52/cf/3052cff27626ca7c85bf1859377bf13e.jpg',
  'https://i.pinimg.com/474x/76/e2/1e/76e21e57153e2f41009d7f44430ec1e5.jpg',
  'https://i.pinimg.com/736x/4b/03/22/4b0322c7705a8452fb0c4fde39121b52.jpg',
  'https://i.pinimg.com/736x/9d/9f/01/9d9f010a7861ae1893b0e6c2b0a41cb4.jpg',
  'https://i.pinimg.com/736x/d5/5d/57/d55d57399c753b9c9b5716d4df10551c.jpg',
  'https://i.pinimg.com/736x/a0/6c/3c/a06c3c0a61339ed25ec0b38867b9d7ff.jpg',
  'https://i.pinimg.com/736x/b0/de/cd/b0decdceedb3ff00d82f382a99d57633.jpg',
  'https://i.pinimg.com/736x/09/a7/ae/09a7ae0bcc7fcdc38f4cf2294c72c334.jpg',
  'https://i.pinimg.com/736x/f0/a4/52/f0a45259f6a35f40af01b7aed77256b0.jpg',
  'https://i.pinimg.com/736x/dd/8e/f8/dd8ef8248b00e9b7ce013a769300de48.jpg',
  'https://i.pinimg.com/736x/33/b0/13/33b0138f114fc308d3b62ff42c2cc1b6.jpg',
  'https://i.pinimg.com/236x/68/9e/25/689e25cd5900eef6ed5c8d2e1cf8daf0.jpg',
  'https://i.pinimg.com/236x/e4/ff/53/e4ff53608df0da6a3ae20b0784184213.jpg',
  'https://i.pinimg.com/236x/ef/3e/fa/ef3efa9368a6590c64d201789d21a074.jpg',
  'https://i.pinimg.com/736x/fe/5d/5b/fe5d5b4197eb6545a5c17b6403779921.jpg',
  'https://i.pinimg.com/736x/0d/04/bd/0d04bd129c8a0a7a341df1fa46c57f4a.jpg',
  'https://i.pinimg.com/236x/92/e7/22/92e722aeff4b0aca5552c397e7c340c7.jpg',
  'https://i.pinimg.com/236x/66/bc/fc/66bcfc5a83980f87e534c8b426c286a0.jpg',
  'https://i.pinimg.com/736x/a5/48/2d/a5482dcc933ac3563d94b17524818d92.jpg',
  'https://i.pinimg.com/736x/58/b7/32/58b7325a6efb20ee5d2e660492cdbe05.jpg',
  'https://i.pinimg.com/736x/7f/3c/23/7f3c2350348d0214a3163b46226d223f.jpg',
  'https://i.pinimg.com/236x/b8/f9/c1/b8f9c174a964944428044983b2a946a1.jpg',
  'https://i.pinimg.com/236x/5c/03/7d/5c037da810c04e61c358198703e5a95a.jpg',
  'https://i.pinimg.com/236x/fc/09/bd/fc09bd5666bac5656b6292fe4c87b35b.jpg',
  'https://i.pinimg.com/736x/52/61/d7/5261d7f635edae90c5d152d364368ac0.jpg',
  'https://i.pinimg.com/736x/aa/db/8b/aadb8bcecd0aacea9ab36395ba50276c.jpg',
  'https://i.pinimg.com/736x/b5/cb/8b/b5cb8bc1c37acdcc9e66c75f28a59e79.jpg',
  'https://i.pinimg.com/736x/e6/24/6c/e6246c6ef6c551987c01e4ba2a97716a.jpg',
  'https://i.pinimg.com/236x/51/1f/e7/511fe7b58127b51cf4fe77d03565e866.jpg',
  'https://i.pinimg.com/736x/27/87/8c/27878c94a36fc0767e3999770b8b23ff.jpg',
  'https://i.pinimg.com/736x/ab/a2/69/aba269d4e2394ecd1b006e60a1afeeab.jpg',
  'https://i.pinimg.com/736x/bd/53/30/bd5330f0375066126a231176aabc129b.jpg',
  'https://i.pinimg.com/736x/ae/7d/94/ae7d94241b389638e8e147d6427bce2c.jpg',
  'https://i.pinimg.com/736x/ff/03/4e/ff034ecfcc1ea93ed3dea6fc484c50a4.jpg',
  'https://i.pinimg.com/736x/54/0d/af/540daffcccaf8602aca26c6b779821d6.jpg',
  'https://i.pinimg.com/736x/ba/c4/7b/bac47b080bc952b4b067e3cc60470043.jpg',
  'https://i.pinimg.com/564x/61/9c/03/619c031bd34948894fec3593cd353b1b.jpg',
  'https://i.pinimg.com/236x/f0/45/38/f045382ae3016cf354222f954463bd54.jpg',
  'https://i.pinimg.com/736x/6c/53/bc/6c53bcf6c1bdfff542e0b9d1cb26248e.jpg',
  'https://i.pinimg.com/736x/0e/f3/04/0ef3049296544f0aee3f2690957f3c9d.jpg',
  'https://i.pinimg.com/736x/ba/40/7b/ba407bbd1ec8869e57554d2cdf6f9364.jpg',
  'https://i.pinimg.com/736x/75/08/46/750846abb2f7c066ade6367888ddc235.jpg',
  'https://i.pinimg.com/236x/a1/e9/ee/a1e9eea1e0e5cbfe8012ebd11c2e4ae6.jpg',
  'https://i.pinimg.com/736x/6a/a0/71/6aa0715ad0959587e42f89e74f0d30fc.jpg',
  'https://i.pinimg.com/736x/0e/21/cf/0e21cf1e658a0413f36994a2d3b9f6a2.jpg',
  'https://i.pinimg.com/736x/c9/0e/08/c90e08ea5e0dd82970adbdd168844976.jpg',
  'https://i.pinimg.com/736x/c0/a0/28/c0a028f41cfcd136b5efce50679641a8.jpg',
  'https://i.pinimg.com/736x/a3/e8/24/a3e82484378de9c8da99f70bb3bcffb7.jpg',
  'https://i.pinimg.com/564x/1f/ab/5c/1fab5c1f2ee1f55f203f4a558da70eb0.jpg',
  'https://i.pinimg.com/736x/7c/d9/aa/7cd9aa1281b939c32d408ede9b45051e.jpg',
  'https://i.pinimg.com/videos/thumbnails/originals/24/57/1f/24571fc391a158295f1ebca10a22849f.0000000.jpg',
  'https://i.pinimg.com/736x/f7/e6/d9/f7e6d9954c04a46b4b29345309283e08.jpg',
  'https://i.pinimg.com/236x/de/42/02/de42028d49a9ecc5ef7e36f55d203cb9.jpg',
  'https://i.pinimg.com/originals/5d/1b/24/5d1b2431c21ec21335915c38dc4b2f9f.jpg',
  'https://i.pinimg.com/236x/40/25/2f/40252f32173ab2c5185dd408bc0ed759.jpg',
  'https://i.pinimg.com/236x/64/2a/0d/642a0d66023180f7b8cedf71de2225c7.jpg',
  'https://i.pinimg.com/564x/7b/a3/53/7ba35319b6bf14beef3a12bb97c3378f.jpg',
  'https://i.pinimg.com/736x/c7/e1/45/c7e14521bf8d2e74a1c6c65a64bf5907.jpg',
  'https://i.pinimg.com/236x/d2/96/36/d29636ff15389621fd6458e6aa018d41.jpg',
  'https://i.pinimg.com/1200x/c5/72/d4/c572d4d89f7b98b12251cc517983cc15.jpg',
  'https://i.pinimg.com/236x/4d/d7/57/4dd757c0c3103fb6df0af5dc39bf0300.jpg',
  'https://i.pinimg.com/236x/a4/9f/76/a49f7643436514fcda9eed8f28b5d4ca.jpg',
  'https://i.pinimg.com/236x/1e/7a/ea/1e7aea92f324cd58a187be4c0b666f60.jpg',
  'https://i.pinimg.com/236x/47/53/81/4753813903f3c16d9631d70d8e5a0f78.jpg',
  'https://i.pinimg.com/236x/ef/c0/44/efc04462ac42aea50bd6dab3b2aac026.jpg',
  'https://i.pinimg.com/736x/08/bd/f6/08bdf6ac5b1b1063a76755cb6aa8b3a4.jpg',
  'https://i.pinimg.com/736x/85/60/c2/8560c2cba5cfdd5aca6669b25640b5c3.jpg',
  'https://i.pinimg.com/736x/01/17/05/011705e559912ac7db583d5992b0a124.jpg',
  'https://i.pinimg.com/736x/e8/b2/0a/e8b20abde126c045d4cf2f990a1dc769.jpg',
  'https://i.pinimg.com/736x/3c/c8/3a/3cc83af15c5f9374c7505cf7c0ad14a2.jpg',
  'https://i.pinimg.com/236x/7a/bf/71/7abf71be10517a687c2fb307385170bd.jpg',
  'https://i.pinimg.com/236x/09/b8/9d/09b89d1287a1f81a8a2e0ae0006a9e42.jpg',
  'https://i.pinimg.com/236x/e1/8c/6e/e18c6e06f640154ff4ae2bc9443fe86f.jpg',
  'https://i.pinimg.com/736x/6a/a8/ba/6aa8ba91facbeb4f346d73f2ee8ff247.jpg',
  'https://i.pinimg.com/236x/1a/72/d2/1a72d2fdf70c0731f1e8dde4fd4cb64d.jpg',
  'https://i.pinimg.com/736x/f9/58/83/f95883954629ac02274a9c481c643051.jpg',
  'https://i.pinimg.com/736x/0a/e2/30/0ae2300d57526692b60b12b646cdd826.jpg',
  'https://i.pinimg.com/236x/7b/18/ed/7b18ed1c4a96cc2a6b818457e468717a.jpg',
  'https://i.pinimg.com/236x/2a/49/e8/2a49e81342d80830bfc74239e2bd0b07.jpg',
  'https://i.pinimg.com/1200x/60/ec/9e/60ec9e6d6e9d58beeaf5862349717328.jpg',
  'https://i.pinimg.com/236x/4c/d6/39/4cd639d6c56071e0de2fe16dd00c0da3.jpg'
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
