const axios = require('axios');
// Mendapatkan token dari Spotify
async function getAccessToken() {
  try {
    const client_id = 'acc6302297e040aeb6e4ac1fbdfd62c3';
    const client_secret = '0e8439a1280a43aba9a5bc0a16f3f009';
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data.access_token;
  } catch (err) {
    console.error('Token Error:', err.message);
    throw new Error('Failed to get Spotify access token');
  }
}

// Mencari lagu di Spotify
/*
async function spotifySearch(query) {
  try {
    const access_token = await getAccessToken();
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    return response.data.tracks.items.map(track => ({
      name: track.name,
      artists: track.artists.map(artist => artist.name).join(', '),
      link: track.external_urls.spotify,
      image: track.album.images[0]?.url || '',
      duration_ms: track.duration_ms
    }));
  } catch (err) {
    console.error('Search Error:', err.message);
    throw new Error('Failed to search Spotify');
  }
}*/
function msToMinutes(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

async function spotifySearch(query) {
  try {
    const access_token = await getAccessToken();
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    return response.data.tracks.items.map(track => ({
      name: track.name,
      artists: track.artists.map(artist => artist.name).join(', '),
      album_name: track.album.name,
      release_date: track.album.release_date,
      popularity: track.popularity,
      preview_url: track.preview_url,
      link: track.external_urls.spotify,
      image: track.album.images[0]?.url || '',
      duration_ms: track.duration_ms,
      duration: msToMinutes(track.duration_ms),
      track_number: track.track_number,
      disc_number: track.disc_number
    }));
  } catch (err) {
    console.error('Search Error:', err.message);
    throw new Error('Failed to search Spotify');
  }
}
// Endpoint Spotify Search API
module.exports = function (app) {
  app.get('/search/spotify', async (req, res) => {
    try {
      const { apikey, q } = req.query;

      if (!apikey || !global.apikey.includes(apikey)) {
        return res.status(403).json({ status: false, error: 'Apikey invalid' });
      }

      if (!q) {
        return res.status(400).json({ status: false, error: 'Query is required' });
      }

      const result = await spotifySearch(q);

      res.status(200).json({
        status: true,
        result
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
