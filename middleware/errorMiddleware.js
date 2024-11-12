export const errorHandler = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Unexpected error',
    status: statusCode,
  });
};
