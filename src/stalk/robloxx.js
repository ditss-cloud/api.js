const fetch = require('node-fetch');

// Fungsi untuk mencari userId berdasarkan username
async function getUserIdByUsername(username) {
  try {
    const response = await fetch(`https://users.roblox.com/v1/usernames/users`, {
      method: 'POST',
      headers: { 'User-Agent': 'PostmanRuntime/7.32.2', 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [username] })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch userId for username: ${response.status}`);
    }

    const data = await response.json();
    if (data.data && data.data.length > 0) {
      return data.data[0].id;
    } else {
      throw new Error('Username tidak ditemukan.');
    }
  } catch (err) {
    throw new Error(`Error mencari userId: ${err.message}`);
  }
}

// Fungsi untuk stalk Roblox user berdasarkan userId
async function robloxStalk(userId) {
  try {
    const headers = { 'User-Agent': 'PostmanRuntime/7.32.2' };

    // Ambil semua data sekaligus termasuk avatar
    const [
      userDetailsRes,
      friendsRes,
      followersRes,
      followingRes,
      inventoryRes,
      groupsRes,
      avatarRes
    ] = await Promise.all([
      fetch(`https://users.roblox.com/v1/users/${userId}`, { headers }),
      fetch(`https://friends.roblox.com/v1/users/${userId}/friends/count`, { headers }),
      fetch(`https://friends.roblox.com/v1/users/${userId}/followers/count`, { headers }),
      fetch(`https://friends.roblox.com/v1/users/${userId}/followings/count`, { headers }),
      fetch(`https://inventory.roblox.com/v1/users/${userId}/assets/collectibles`, { headers }),
      fetch(`https://groups.roblox.com/v1/users/${userId}/groups/roles`, { headers }),
      fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=false`, { headers })
    ]);

    if (!userDetailsRes.ok) throw new Error(`Gagal ambil data user: ${userDetailsRes.status}`);

    const userDetails = await userDetailsRes.json();
    const friendsCount = friendsRes.ok ? (await friendsRes.json()).count : 0;
    const followersCount = followersRes.ok ? (await followersRes.json()).count : 0;
    const followingCount = followingRes.ok ? (await followingRes.json()).count : 0;
    const inventory = inventoryRes.ok ? (await inventoryRes.json()).data : [];
    const groups = groupsRes.ok ? (await groupsRes.json()).data : [];

    const avatarData = avatarRes.ok ? (await avatarRes.json()).data[0].imageUrl : null;

    return {
      status: true,
      result: {
        userId: userDetails.id,
        username: userDetails.name,
        displayName: userDetails.displayName,
        avatar: avatarData || 'https://tr.rbxcdn.com/252512d014e5e848a1dc6e9c5e7d6fcd/420/420/AvatarHeadshot/Png',
        bio: userDetails.description || 'No bio available.',
        createdAt: userDetails.created,
        isBanned: userDetails.isBanned,
        friendsCount,
        followersCount,
        followingCount,
        inventory,
        groups
      }
    };
  } catch (err) {
    return {
      status: false,
      error: err.message || 'Terjadi kesalahan saat stalk user Roblox.'
    };
  }
}

// Route handler untuk Express
module.exports = function (app) {
  app.get('/stalk/roblox', async (req, res) => {
    const { apikey, username } = req.query;

    // Debug log untuk memastikan parameter diterima
    console.log('Query Parameters:', req.query);

    // Validasi API Key
    if (!global.apikey || !global.apikey.includes(apikey)) {
      return res.json({ status: false, error: 'Apikey invalid' });
    }

    // Validasi parameter username
    if (!username || username.trim() === '') {
      return res.json({
        status: false,
        creator: 'ditss',
        error: 'Parameter username diperlukan'
      });
    }

    try {
      // Panggil fungsi untuk mendapatkan userId berdasarkan username
      const userId = await getUserIdByUsername(username);

      // Stalk informasi user berdasarkan userId
      const result = await robloxStalk(userId);

      // Kirimkan hasil berhasil atau gagal
      res.status(result.status ? 200 : 500).json(result);
    } catch (error) {
      // Tangani error dan kirimkan respons
      res.status(500).json({
        status: false,
        creator: 'ditss',
        error: `Error: ${error.message}`
      });
    }
  });
};
