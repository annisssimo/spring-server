import { AuthenticationService } from '../services/authenticationService.js';
import { setRefreshTokenCookie } from '../utils/tokenUtils.js';

import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';

export const signup = async (req, res) => {
  try {
    const { statusCode, data, refreshToken } =
      await AuthenticationService.signup(req.body);
    setRefreshTokenCookie(res, refreshToken);
    res.status(statusCode).json(data);
  } catch (error) {
    if (error.errors) {
      res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ errors: error.errors });
    } else {
      res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: error.error });
    }
  }
};
