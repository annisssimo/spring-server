import { AuthenticationService } from '../services/authenticationService.js';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';
import TokenController from '../utils/tokenUtils.js';

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { accessToken, refreshToken } =
      await AuthenticationService.authenticate(username, password);

    TokenController.setRefreshTokenCookie(res, refreshToken);

    return res.status(HTTP_STATUS_CODES.CREATED).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
