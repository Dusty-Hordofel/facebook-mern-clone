import express from 'express';
import {
  activateAccount,
  login,
  register,
  auth,
  sendVerification,
  sendResetPasswordCode,
  findUser,
  validateResetCode,
} from '../controllers/user.js';
import { authUser } from '../middlwares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/activate', authUser, activateAccount);

router.post('/findUser', findUser);

router.post('/sendVerification', authUser, sendVerification);
router.post('/sendResetPasswordCode', sendResetPasswordCode);
router.post('/validateResetCode', validateResetCode);

// router.post('/auth', authUser, auth);

export default router;
