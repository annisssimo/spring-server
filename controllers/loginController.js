import { HttpError } from '../utils/httpError.js';
import { HttpStatusCode } from '../utils/httpStatusCode.js';

export const login = (req, res, next) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(HttpStatusCode.CREATED).json({ isAuthenticated: true });
  } else {
    return next(
      new HttpError('Invalid credentials', HttpStatusCode.UNAUTHORIZED),
    );
  }
};
