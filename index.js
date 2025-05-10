import express from 'express';
import TaskRouter from './router/task-router.js';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:portaFront',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHearders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use('/tasks', TaskRouter);

const porta = 3000;

app.listen(porta, () => {
  console.log(`App esta rodando na porta ${porta}`);
});