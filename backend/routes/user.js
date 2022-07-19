import express from 'express';
import { home } from '../controllers/user.js';

const router = express.Router();

router.get('/', home);
router.get('/books', (req, res) => {
  res.send('Hello the new Books!');
});

export default router;
