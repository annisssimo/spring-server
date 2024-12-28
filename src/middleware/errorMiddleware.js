import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';

export const errorHandler = (error, req, res) => {
  const statusCode =
    error.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = error.message || ERROR_MESSAGES.UNEXPECTED_ERROR;

  res.status(statusCode).json({
    message,
    status: statusCode,
  });
};
