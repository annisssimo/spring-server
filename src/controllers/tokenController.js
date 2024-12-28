import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import { HttpError } from '../utils/httpError.js';
import {
  validateRefreshToken,
  verifyToken,
  generateAccessToken,
} from '../utils/tokenUtils.js';

export const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new HttpError(
        ERROR_MESSAGES.REFRESH_TOKEN_REQUIRED,
        HTTP_STATUS_CODES.UNAUTHORIZED,
      );
    }

    validateRefreshToken(refreshToken);

    const user = await verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const accessToken = generateAccessToken(user);

    res.status(HTTP_STATUS_CODES.OK).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
