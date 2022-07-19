import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/books', (req, res) => {
  res.send('Hello the new Books!');
});

app.listen(8600, () => {
  console.log('server is running at port 8600');
});
