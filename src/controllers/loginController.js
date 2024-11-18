import jwt from 'jsonwebtoken';

import { LoginService } from '../services/loginService.js';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await LoginService.authenticate(username, password);

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' },
    );

    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '14d' },
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(HTTP_STATUS_CODES.CREATED).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
