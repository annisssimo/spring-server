import { HttpError } from '../utils/httpError.js';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';

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
        HTTP_STATUS_CODES.UNAUTHORIZED,
      );
    }
  }
}
