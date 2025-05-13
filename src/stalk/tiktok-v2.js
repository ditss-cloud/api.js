const cheerio = require('cheerio');
const fetch = require('node-fetch');

async function tiktokStalk(user) {
  try {
    const url = await fetch(`https://www.tiktok.com/@${user}`, {
      headers: {
        'User-Agent': 'PostmanRuntime/7.32.2'
      }
    });

    const html = await url.text();
    const $ = cheerio.load(html);
    const data = $('#__UNIVERSAL_DATA_FOR_REHYDRATION__').text();
    const json = JSON.parse(data);

    if (json['__DEFAULT_SCOPE__']['webapp.user-detail'].statusCode !== 0) {
      return { status: 'error', message: 'User not found!' };
    }

    const res = json['__DEFAULT_SCOPE__']['webapp.user-detail']['userInfo'];
    return res;
  } catch (err) {
    return { status: 'error', message: err.message };
  }
}

module.exports = function (app) {
  app.get('/stalk/tiktok-v2', async (req, res) => {
    const { apikey, user } = req.query;
    if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });
    if (!user) return res.json({ status: false, error: 'User is required' });

    try {
      const data = await tiktokStalk(user);
      if (data.status === 'error') return res.json(data);

      const userInfo = data.user;
      const stats = data.stats;

      // Ambil nama negara dari API tambahan
      let region_full = 'Unknown';
      try {
        const regionRes = await fetch(`https://ditss.cloud/api/kode-negara?kode=${userInfo.region}`);
        const regionJson = await regionRes.json();
        if (regionJson.status) region_full = regionJson.result.negara;
      } catch (e) {
        region_full = 'Unknown';
      }

      // Format respon akhir
      const result = {
        id: userInfo.id,
        uniqueId: userInfo.uniqueId,
        nickname: userInfo.nickname,
        signature: userInfo.signature,
        avatar: {
          thumb: userInfo.avatarThumb,
          medium: userInfo.avatarMedium,
          larger: userInfo.avatarLarger
        },
        verified: userInfo.verified,
        region: userInfo.region,
        region_name: region_full,
        language: userInfo.language,
        createTime: userInfo.createTime,
        nickNameModifyTime: userInfo.nickNameModifyTime,
        statistics: {
          followerCount: stats.followerCount,
          followingCount: stats.followingCount,
          heart: stats.heart,
          videoCount: stats.videoCount
        }
      };

      res.json({
        status: true,
        creator: 'ditss',
        result
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
