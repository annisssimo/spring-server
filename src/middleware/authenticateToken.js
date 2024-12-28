import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res
          .status(HTTP_STATUS_CODES.FORBIDDEN)
          .json({ message: 'Forbidden' });
      }

      req.user = user;
      next();
    });
  } else {
    res
      .status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });
  }
};
