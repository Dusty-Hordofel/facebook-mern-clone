import express from 'express';
import cors from 'cors';
const app = express();
const allowed = ['http://localhost:3002', '...'];
function options(req, res) {
  let tmp;
  let origin = req.header('Origin');
  if (allowed.indexOf(origin) > -1) {
    tmp = { origin: true, optionsSuccessStatus: 200 };
  } else {
    tmp = { origin: 'stupid' };
  }
  res(null, tmp);
}
// const options = {
//   origin: 'http://localhost:3002',
//   useSuccessStatusCode: 200,
// };

//middleware
app.use(express.json());
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/books', (req, res) => {
  res.send('Hello the new Books!');
});

app.listen(8600, () => {
  console.log('server is running at port 8600');
});
