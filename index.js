const express = require('express');
const axios = require('axios');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Middleware for JSON Parsing
app.use(express.json());

// Serve static content
app.use(express.static('public'));

// Router for service endpoints
const triviaRouter = express.Router();
app.use(`/trivia/search`, triviaRouter);

// Define endpoint to fetch trivia
triviaRouter.get('/search', async (req, res) => {
  const { topic } = req.query;

  const options = {
    method: 'GET',
    url: 'https://webknox-trivia-knowledge-facts-v1.p.rapidapi.com/trivia/search',
    params: { topic: 'teeth' },
    headers: {
      'X-RapidAPI-Key': '6e3ef13a0bmsh371c2c3d53ec18fp148385jsn1cce91e21da0',
      'X-RapidAPI-Host': 'webknox-trivia-knowledge-facts-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Default route
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});