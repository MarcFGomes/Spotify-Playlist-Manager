// utils/spotifyApi.js

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const tokenUrl = 'https://accounts.spotify.com/api/token';
const apiUrl = 'https://api.spotify.com/v1';

let cachedToken = null;
let tokenExpiry = 0;

// Request an access token using Client Credentials flow
export const getAccessToken = async () => {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) {
    return cachedToken; // reuse token if not expired
  }

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to get Spotify access token');
  }

  const data = await response.json();
  cachedToken = data.access_token;
  tokenExpiry = now + data.expires_in * 1000; // expires_in is in seconds
  return cachedToken;
};

// Search tracks on Spotify
const searchTracks = async (searchSong) => {
  try {
    const token = await getAccessToken();
    const endpoint = `${apiUrl}/search?q=${encodeURIComponent(searchSong)}&type=track`;

    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Spotify search request failed');

    const jsonResponse = await response.json();
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists.map(a => a.name).join(', '),
      album: track.album.name,
      preview: track.preview_url
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default searchTracks;
