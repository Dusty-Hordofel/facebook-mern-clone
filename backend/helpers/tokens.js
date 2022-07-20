import jwt from 'jsonwebtoken';

export const generateToken = (payload, expired) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expired,
  }); //jwt.sign is used to generate a token
};
