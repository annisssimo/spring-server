import jwt from 'jsonwebtoken';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';

export const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' },
    );

    res.json({ accessToken });
  });
};
