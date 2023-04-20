// index.js
import express from 'express';

const app = express();
const port = 8000;

app.get('/time', (req, res) => {
  const currentTime = new Date().toLocaleTimeString();
  res.send(currentTime);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
