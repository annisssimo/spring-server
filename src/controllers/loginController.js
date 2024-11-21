import { AuthenticationService } from '../services/authenticationService.js';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';
import { setRefreshTokenCookie } from '../utils/tokenUtils.js';

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const { accessToken, refreshToken } =
      await AuthenticationService.authenticate(username, password);

    setRefreshTokenCookie(res, refreshToken);

    return res.status(HTTP_STATUS_CODES.CREATED).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
