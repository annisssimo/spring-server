import express from 'express';
import { signup } from '../controllers/signupController.js';

const router = express.Router();

router.post('/signup', signup); //добавить мидлвару для валидации

export default router;
