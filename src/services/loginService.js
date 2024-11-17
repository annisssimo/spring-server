import { HttpError } from '../utils/httpError.js';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

export class LoginService {
  static async authenticate(username, password) {
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS_CODES.UNAUTHORIZED,
      );
    }

    return user;
  }
}
