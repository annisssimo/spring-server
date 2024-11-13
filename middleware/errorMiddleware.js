import { HttpStatusCode } from '../utils/httpStatusCode.js';
import { ERROR_MESSAGES } from '../utils/errorMessages.js';

export const errorHandler = (err, req, res) => {
  const statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    message: err.message || ERROR_MESSAGES.UNEXPECTED_ERROR,
    status: statusCode,
  });
};
