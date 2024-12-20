const express = require('express');
const fetch = require('node-fetch');  // node-fetch를 import
const app = express();
require('dotenv').config();
const cors = require('cors');
const PORT = 5000;

app.use(express.json());
app.use(cors());

// 책 검색 API 엔드포인트
app.get('/search/book', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ error: '검색어(query)가 필요합니다.' });
  }

  try {
    // fetch를 사용하여 Naver API에 요청
    const response = await fetch(`https://openapi.naver.com/v1/search/book_adv.json?d_titl=${query}`, {
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': import.meta.env.VITE_APP_CLIENT_ID,
        'X-Naver-Client-Secret': import.meta.env.VITE_APP_CLIENT_SECRET,
      },
    });

    if (!response.ok) {
      throw new Error('API 요청 실패');
    }

    const data = await response.json();  // JSON으로 변환
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Naver API:', error);
    res.status(500).json({ error: 'An error occurred while fetching data from Naver API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
