import { HttpError } from '../utils/httpError.js';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import TokenController from '../utils/tokenUtils.js';

export class AuthenticationService {
  static async authenticate(username, password) {
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpError(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS_CODES.UNAUTHORIZED,
      );
    }
    return TokenController.generateTokens(user);
  }

  static async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  static async createUser(data) {
    const { username, password, firstName, lastName, age } = data;
    const hashedPassword = await this.hashPassword(password);

    try {
      const newUser = await User.create({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        age,
      });
      return newUser;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw { errors: { username: ERROR_MESSAGES.USERNAME_EXISTS } };
      }
      throw new HttpError(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  static async signup(signupData) {
    try {
      const newUser = await this.createUser(signupData);

      const { accessToken, refreshToken } =
        TokenController.generateTokens(newUser);

      return {
        statusCode: HTTP_STATUS_CODES.CREATED,
        data: {
          message: 'User created',
          user: {
            id: newUser.id,
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            age: newUser.age,
          },
          accessToken,
        },
        refreshToken,
      };
    } catch (err) {
      return {
        statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
        data: {
          err: err.errors,
        },
      };
    }
  }
}
