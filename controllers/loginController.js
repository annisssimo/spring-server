import { HttpError } from '../utils/httpError.js';

export const login = (req, res, next) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(200).json({ isAuthenticated: true });
  } else {
    return next(new HttpError('Invalid credintials', 401));
  }
};
