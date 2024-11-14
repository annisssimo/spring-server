import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';

export const errorHandler = (err, req, res) => {
  const statusCode = err.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    message: err.message || ERROR_MESSAGES.UNEXPECTED_ERROR,
    status: statusCode,
  });
};
