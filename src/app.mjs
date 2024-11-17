import express from 'express';
import cors from 'cors';
import loginRoutes from './routes/login.js';
import projectsRoutes from './routes/projects.js';
import signupRoutes from './routes/signup.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { initializeDatabase } from './database/index.js';

const app = express();
const HOST = 'localhost';
const PORT = process.env.PORT || 3441;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Server is running on http://${HOST}:${PORT}/`);
});

app.use(loginRoutes);
app.use(projectsRoutes);
app.use(signupRoutes);
app.use(errorHandler);

initializeDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}/`);
});
