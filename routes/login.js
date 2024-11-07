import express from 'express';
import 'dotenv/config';

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(200).json({ isAuthenticated: true });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

export default router;
