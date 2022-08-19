import express from 'express';
import {
  activateAccount,
  login,
  register,
  auth,
  sendVerification,
} from '../controllers/user.js';
import { authUser } from '../middlwares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/activate', authUser, activateAccount);
router.post('/sendVerification', authUser, sendVerification);
router.post('/login', login);
// router.post('/auth', authUser, auth);

export default router;
