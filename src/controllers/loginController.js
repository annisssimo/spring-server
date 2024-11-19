import { LoginService } from '../services/loginService.js';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';
import { generateTokens, setRefreshTokenCookie } from '../utils/tokenUtils.js';

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await LoginService.authenticate(username, password);

    const { accessToken, refreshToken } = generateTokens(user);
    setRefreshTokenCookie(res, refreshToken);

    return res.status(HTTP_STATUS_CODES.CREATED).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
