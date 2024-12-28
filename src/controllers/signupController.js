import { AuthenticationService } from '../services/authenticationService.js';
import TokenController from '../utils/tokenUtils.js';

export const signup = async (req, res) => {
  const { statusCode, data, refreshToken } = await AuthenticationService.signup(
    req.body,
  );
  TokenController.setRefreshTokenCookie(res, refreshToken);
  res.status(statusCode).json(data);
};
