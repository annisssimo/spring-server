import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { projects } from './data/projects.js';

const app = express();
const HOST = 'localhost';
const PORT = process.env.PORT || 3441;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Server is running on http://${HOST}:${PORT}/`);
});

app.post('/login', (req, res) => {
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

app.get('/projects', (req, res) => {
  const searchQuery = req.query.search.toLowerCase();

  const filteredProjects = projects.filter(
    (proj) =>
      proj.title.toLowerCase().includes(searchQuery) ||
      proj.description.toLowerCase().includes(searchQuery)
  );

  res.status(200).json(filteredProjects);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}/`);
});
