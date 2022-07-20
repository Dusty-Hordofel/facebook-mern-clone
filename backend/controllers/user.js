import {
  validateEmail,
  validateLength,
  validateUsername,
} from '../helpers/validation.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt'; //bcryptjs is used to hash the password.
import { generateToken } from '../helpers/tokens.js';

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

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
