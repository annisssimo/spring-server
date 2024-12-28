import { AuthenticationService } from '../services/authenticationService.js';
import { setRefreshTokenCookie } from '../utils/tokenUtils.js';

export const signup = async (req, res) => {
  const { statusCode, data, refreshToken } = await AuthenticationService.signup(
    req.body,
  );
  setRefreshTokenCookie(res, refreshToken);
  res.status(statusCode).json(data);
};
