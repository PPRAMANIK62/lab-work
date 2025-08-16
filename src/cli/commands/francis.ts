import * as readline from 'readline';
import { francisInputSchema } from '../../types';
import { calculateHa, calculateQ, calculateParameters } from '../../utils/calculations';
import { formatters, displayResults } from '../../utils/formatters';
import { CONSTANTS } from '../../utils/constants';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getInput = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      resolve(answer);
    });
  });
};

export const francisCommand = async () => {
  try {
    console.log("=== Francis Turbine Calculator ===\n");

    const input1 = await getInput("Enter +ve pressure gauge reading: ");
    const input2 = await getInput("Enter -ve pressure gauge reading: ");
    const input3 = await getInput("Enter w1 (kg): ");
    const input4 = await getInput("Enter w2 (kg): ");
    const input5 = await getInput("Enter N (rpm): ");

    const input = francisInputSchema.parse({
      pressure_gauge_reading_positive: parseFloat(input1),
      pressure_gauge_reading_negative: parseFloat(input2),
      w1: parseFloat(input3),
      w2: parseFloat(input4),
      N: parseFloat(input5),
    });

    const h = CONSTANTS.FRANCIS.hf - CONSTANTS.FRANCIS.hi;
    const H = CONSTANTS.FRANCIS.h1 + CONSTANTS.FRANCIS.hf - CONSTANTS.FRANCIS.hi;
    const T = (input.w1 - input.w2) * CONSTANTS.g * (CONSTANTS.FRANCIS.r_brake_wheel + CONSTANTS.FRANCIS.r_rope);
    const Pt = (2 * Math.PI * input.N * T) / 60;

    const Ha = calculateHa(input.pressure_gauge_reading_positive, 'francis', input.pressure_gauge_reading_positive, input.pressure_gauge_reading_negative);
    const { Va1 } = calculateQ(h, H, 0, 'francis');
    const { Q } = calculateQ(h, H, Va1, 'francis');
    const results = calculateParameters(input.N, Q, T, Pt, Ha);

    displayResults({
      Ha: formatters.threeDecimal(Ha),
      N1: formatters.threeDecimal(results.N1),
      Q1: formatters.sixDecimal(results.Q1),
      T1: formatters.threeDecimal(results.T1),
      Pt1: formatters.threeDecimal(results.Pt1),
      Pa: formatters.threeDecimal(results.Pa),
      eta: formatters.threeDecimal(results.eta),
    });

  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error);
  } finally {
    rl.close();
  }
};