import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ status: 'error', message: 'URL tidak boleh kosong' });
  }

  try {
    const response = await axios.request({
      method: 'GET',
      url: 'https://tikwm-api.p.rapidapi.com/resources/video/v2',
      headers: {
        'x-rapidapi-host': 'tikwm-api.p.rapidapi.com',
        'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY
      }
    });

    const data = response.data;

    if (data && data.data) {
      return res.status(200).json({
        status: 'success',
        title: data.data.title || 'TikTok Video',
        author: data.data.author?.unique_id || 'unknown',
        thumbnail: data.data.cover || '',
        video_nowatermark: data.data.play || '',
        audio: data.data.music || ''
      });
    } else {
      return res.status(500).json({ status: 'error', message: 'Struktur data API tidak sesuai atau video privat' });
    }

  } catch (error) {
    console.error('Error Backend:', error.message);
    return res.status(500).json({ status: 'error', message: error.message });
  }
}