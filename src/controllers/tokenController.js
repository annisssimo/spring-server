import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';

export const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
      error: ERROR_MESSAGES.REFRESH_TOKEN_REQUIRED,
    });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(HTTP_STATUS_CODES.FORBIDDEN).json({
        error: ERROR_MESSAGES.INVALID_REFRESH_TOKEN,
      });

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' },
    );

    res.status(HTTP_STATUS_CODES.OK).json({ accessToken });
  });
};
