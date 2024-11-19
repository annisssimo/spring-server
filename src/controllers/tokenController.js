import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import {
  validateRefreshToken,
  verifyToken,
  generateAccessToken,
} from '../utils/tokenUtils.js';

export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    validateRefreshToken(refreshToken);

    const user = await verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const accessToken = generateAccessToken(user);

    return res.status(HTTP_STATUS_CODES.OK).json({ accessToken });
  } catch (err) {
    if (err.message === 'Refresh token is required') {
      return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({
        error: ERROR_MESSAGES.REFRESH_TOKEN_REQUIRED,
      });
    }
    return res.status(HTTP_STATUS_CODES.FORBIDDEN).json({
      error: ERROR_MESSAGES.INVALID_REFRESH_TOKEN,
    });
  }
};
