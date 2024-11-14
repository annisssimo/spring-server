import { LoginService } from '../services/loginService.js';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';

export const login = (req, res, next) => {
  const { username, password } = req.body;

  try {
    LoginService.authenticate(username, password);
    res.status(HTTP_STATUS_CODES.CREATED).send();
  } catch (error) {
    next(error);
  }
};
