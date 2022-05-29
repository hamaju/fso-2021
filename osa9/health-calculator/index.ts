import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = bmiCalculator(Number(height), Number(weight));
    res.send({ weight, height, bmi });
  } else {
    res.status(400);
    res.send({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  const { body } = req;

  const daily_exercises: number[] = body.daily_exercises;
  const target: number = body.target;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  }

  if (!isNaN(Number(target)) && !daily_exercises.some(isNaN)) {
    const result = exerciseCalculator(target, daily_exercises);
    res.send(result);
  } else {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
