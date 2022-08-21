import {
  validateEmail,
  validateLength,
  validateUsername,
} from '../helpers/validation.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt'; //bcryptjs is used to hash the password.
import { generateToken } from '../helpers/tokens.js';
import { sendVerificationEmail } from '../helpers/mailer.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body; //extract these informations from req.body

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: 'invalid email address',
      });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          'This email address already exists,try with a different email address',
      });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: 'first name must between 3 and 30 characters.',
      });
    }

    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: 'last name must between 3 and 30 characters.',
      });
    }

    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: 'password must be atleast 6 characters.',
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);
    //we can just write req.body instead of all info we have put in the user
    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save(); //save a new user

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      '30m'
    );
    console.log(emailVerificationToken);

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    console.log(url);
    sendVerificationEmail(user.email, user.first_name, url); //send email to user
    const token = generateToken({ id: user._id.toString() }, '7d'); //to generate a token
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: 'Register Success ! please activate your email to start',
    });

    //res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);

    if (validUser !== user.id) {
      return res.status(400).json({
        message: "You don't have the authorization to complete this operation.",
      });
    }
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: 'This email is already activated.' });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: 'Account has beeen activated successfully.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendVerification = async (req, res) => {
  try {
    const id = req.user.id; // accessible only from authUser middleware
    const user = await User.findById(id); //we pass the id we got from authUser middleware
    if (user.verified === true) {
      return res.status(400).json({
        message: 'This account is already activated.',
      });
    }
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      '30m'
    ); //we generate a token for the user

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    return res.status(200).json({
      message: 'Email verification link has been sent to your email.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message:
          'the email address you entered is not connected to an account.',
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: 'Invalid credentials.Please try again.',
      });
    }

    const token = generateToken({ id: user._id.toString() }, '7d');
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
    });
  } catch (error) {
    console.log({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

export const auth = (req, res) => {
  console.log(req.user);
  res.json('we are in auth');
};

export const findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      return res.status(400).json({
        message: 'Account does not exists.',
      });
    }
    return res.status(200).json({
      email: user.email,
      picture: user.picture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
