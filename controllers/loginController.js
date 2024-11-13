import { LoginService } from '../services/loginService.js';
import { HTTP_STATUS_CODES } from '../utils/httpStatusCode.js';

export const login = (req, res, next) => {
  const { username, password } = req.body;

  try {
    const auth = LoginService.authenticate(username, password);
    res.status(HTTP_STATUS_CODES.CREATED).json(auth);
  } catch (error) {
    next(error);
  }
};
