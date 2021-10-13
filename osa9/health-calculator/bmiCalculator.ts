interface Result {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): Result => {
  if (args.length < 4) throw new Error('missing arguments');
  if (args.length > 4) throw new Error('too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('provided values were not numbers!');
  }
};

const bmiCalculator = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) * (height / 100));

  if (bmi < 18.5) return 'Underweight';
  else if (bmi > 24.9) return 'Overweight';
  else return 'Normal (healthy weight)';
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(bmiCalculator(height, weight));
} catch (e) {
  console.log('Error:', e.message);
}

export { bmiCalculator };
