import express from 'express';
import { login } from '../controllers/loginController.js';
import { signup } from '../controllers/signupController.js';
import { refreshAccessToken } from '../controllers/tokenController.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/signup', signup);
authRouter.post('/token', refreshAccessToken);

export default authRouter;
