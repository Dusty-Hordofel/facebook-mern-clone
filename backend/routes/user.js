import express from 'express';
import { home } from '../controllers/user.js';

const router = express.Router();

router.get('/', home);
router.get('/books', (req, res) => {
  res.status(200).json({ message: 'Hello the new Books!' }); //if we use 204 we are not going to see the body
});

export default router;
