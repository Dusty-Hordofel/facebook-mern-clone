import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
//import { readdirSync } from 'fs';

const app = express();
dotenv.config();

//database connection
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('database connected successfully');
  })
  .catch((err) => {
    console.log('something went wrong while connecting to the database', err);
  });

//cors
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

app.use('/api/user', userRoutes);
// console.log(
//   readdirSync('./routes').map((r) => app.use('/', require(`./routes/${r}`)))
// );
const port = process.env.PORT || 8700;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
