import { LoginService } from '../services/loginService.js';
import { HttpStatusCode } from '../utils/httpStatusCode.js';

export const login = (req, res, next) => {
  const { username, password } = req.body;

  try {
    const auth = LoginService.authenticate(username, password);
    res.status(HttpStatusCode.CREATED).json(auth);
  } catch (error) {
    next(error);
  }
};
