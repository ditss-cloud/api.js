const fetch = require('node-fetch');

// Fungsi untuk mencari userId berdasarkan username
async function getUserIdByUsername(username) {
  try {
    const response = await fetch(`https://users.roblox.com/v1/usernames/users`, {
      method: 'POST',
      headers: { 'User-Agent': 'PostmanRuntime/7.32.2' },
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

    // Mengambil data dasar user dan data pertemanan/followers
    const [userDetailsRes, friendsRes, followersRes, followingRes, inventoryRes, groupsRes] = await Promise.all([
      fetch(`https://users.roblox.com/v1/users/${userId}`, { headers }),
      fetch(`https://friends.roblox.com/v1/users/${userId}/friends/count`, { headers }),
      fetch(`https://friends.roblox.com/v1/users/${userId}/followers/count`, { headers }),
      fetch(`https://friends.roblox.com/v1/users/${userId}/followings/count`, { headers }),
      fetch(`https://inventory.roblox.com/v1/users/${userId}/assets/collectibles`, { headers }), // Data koleksi item
      fetch(`https://groups.roblox.com/v1/users/${userId}/groups/roles`, { headers }) // Data grup yang diikuti
    ]);

    if (!userDetailsRes.ok) throw new Error(`Gagal ambil data user: ${userDetailsRes.status}`);

    const userDetails = await userDetailsRes.json();
    const friendsCount = friendsRes.ok ? (await friendsRes.json()).count : 0;
    const followersCount = followersRes.ok ? (await followersRes.json()).count : 0;
    const followingCount = followingRes.ok ? (await followingRes.json()).count : 0;
    const inventory = inventoryRes.ok ? (await inventoryRes.json()).data : []; // Menyimpan data item yang dimiliki
    const groups = groupsRes.ok ? (await groupsRes.json()).data : []; // Menyimpan grup yang diikuti

    return {
      status: true,
      result: {
        userId: userDetails.id,
        username: userDetails.name,
        displayName: userDetails.displayName,
        avatar: `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`,
        bio: userDetails.description || 'No bio available.',
        createdAt: userDetails.created,
        isBanned: userDetails.isBanned,
        friendsCount,
        followersCount,
        followingCount,
        inventory, // Item koleksi
        groups // Grup yang diikuti
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
    if (!global.apikey.includes(apikey)) return res.json({ status: false, error: 'Apikey invalid' });
    if (!username) return res.json({ status: false, error: 'Parameter username diperlukan' });

    try {
      // Mencari userId berdasarkan username
      const userId = await getUserIdByUsername(username);
      
      // Mengambil data user berdasarkan userId
      const result = await robloxStalk(userId);
      res.status(result.status ? 200 : 500).json(result);
    } catch (error) {
      res.status(500).json({ status: false, error: `Error: ${error.message}` });
    }
  });
};
