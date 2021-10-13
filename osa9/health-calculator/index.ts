import express from 'express';
import { bmiCalculator } from './bmiCalculator';

const app = express();

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

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
