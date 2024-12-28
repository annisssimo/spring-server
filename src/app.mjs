import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { initializeDatabase } from './database/index.js';
import authRouter from './routes/authRouter.js';
import projectsRoutes from './routes/projects.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

const HOST = process.env.HOST;
const PORT = process.env.PORT || 3441;
const CLIENT_PORT = process.env.CLIENT_PORT;

initializeDatabase();

app.use(
  cors({
    origin: `http://${HOST}:${CLIENT_PORT}`,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRouter);
app.use(projectsRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}/`);
});
