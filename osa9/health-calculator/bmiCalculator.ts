interface Result {
  height: number;
  mass: number;
}

const parseArguments = (args: Array<string>): Result => {
  if (args.length < 4) throw new Error('missing arguments');
  if (args.length > 4) throw new Error('too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3]),
    };
  } else {
    throw new Error('provided values were not numbers!');
  }
};

const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / ((height / 100) * (height / 100));

  if (bmi < 18.5) return 'Underweight';
  else if (bmi > 24.9) return 'Overweight';
  else return 'Normal (healthy weight)';
};

try {
  const { height, mass } = parseArguments(process.argv);
  console.log(calculateBmi(height, mass));
} catch (e) {
  console.log('Error:', e.message);
}

export {};
