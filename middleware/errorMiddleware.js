import { HttpStatusCode } from '../utils/httpStatusCode.js';

export const errorHandler = (err, req, res) => {
  const statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    message: err.message || 'Unexpected error',
    status: statusCode,
  });
};
