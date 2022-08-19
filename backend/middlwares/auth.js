import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
  try {
    //tmp refers to temporary variable
    let tmp = req.header('Authorization'); //get the token from the header

    const token = tmp ? tmp.slice(7, tmp.length) : ''; //remove the 'Bearer ' from the token
    if (!token) {
      return res.status(400).json({ message: 'Invalid Authentification' }); //if there is no token return error
    }
    //verify the token. if it is valid, return the user id witch is in the token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ message: 'Invalid Authentification' });
      }
      req.user = user; //the user come from the token, from jwt
      // console.log(user);
      next(); //continue to the next middleware
    }); //jwt.verify takes 3 parameters: token, secret, callback.
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
