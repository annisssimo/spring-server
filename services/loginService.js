import { HttpError } from '../utils/httpError.js';
import { HttpStatusCode } from '../utils/httpStatusCode.js';
import { ERROR_MESSAGES } from '../utils/errorMessages.js';

export class LoginService {
  static authenticate(username, password) {
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return { isAuthenticated: true };
    } else {
      throw new HttpError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HttpStatusCode.UNAUTHORIZED,
      );
    }
  }
}
