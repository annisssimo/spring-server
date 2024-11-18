import { SignupService } from '../services/signupService.js';
import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';

export const signup = async (req, res) => {
  try {
    await SignupService.validateSignupData(req.body);

    const newUser = await SignupService.createUser(req.body);

    res
      .status(HTTP_STATUS_CODES.CREATED)
      .json({ message: 'User created', user: newUser });
  } catch (error) {
    if (error.errors) {
      res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ errors: error.errors });
    } else {
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: error.error });
    }
  }
};
