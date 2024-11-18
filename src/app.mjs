import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { initializeDatabase } from './database/index.js';
import loginRoutes from './routes/login.js';
import projectsRoutes from './routes/projects.js';
import signupRoutes from './routes/signup.js';
import tokenRoutes from './routes/token.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

const HOST = process.env.HOST;
const PORT = process.env.PORT || 3441;

initializeDatabase();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(loginRoutes);
app.use(projectsRoutes);
app.use(signupRoutes);
app.use(tokenRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}/`);
});
