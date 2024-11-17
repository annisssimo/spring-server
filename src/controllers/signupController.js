import { User } from '../models/user.js';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res, next) => {
  const { username, password, firstName, lastName, age } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      age,
    });

    res
      .status(HTTP_STATUS_CODES.CREATED)
      .json({ message: 'User created', newUser });
  } catch (err) {
    next(err);
  }
};
