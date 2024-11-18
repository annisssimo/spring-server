import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

export class SignupService {
  static async validateSignupData(data) {
    const { username, password, firstName, lastName, age } = data;
    const errors = {};

    if (!username || username.length < 3)
      errors.username = 'Username must be at least 3 characters';
    if (!password || !/\d/.test(password) || !/[a-zA-Z]/.test(password))
      errors.password = 'Password must include at least 1 letter and 1 number';
    if (password.length < 4)
      errors.password = 'Password must be at least 4 characters';
    if (!firstName || firstName.length < 3)
      errors.firstName = 'First name must be at least 3 characters';
    if (!lastName || lastName.length < 3)
      errors.lastName = 'Last name must be at least 3 characters';
    if (!age || isNaN(age) || age <= 0)
      errors.age = 'Age must be a valid number greater than 0';

    if (Object.keys(errors).length > 0) throw { errors };
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
        throw { errors: { username: 'Username already exists' } };
      }
      throw { error: 'Internal server error' };
    }
  }
}