import { AuthenticationService } from '../services/authenticationService.js';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';

export const signup = async (req, res) => {
  try {
    const result = await AuthenticationService.signup(req.body, res);

    res.status(result.statusCode).json(result.data);
  } catch (error) {
    res
      .status(error.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message || 'Internal Server Error' });
  }
};
