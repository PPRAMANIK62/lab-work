import * as readline from 'readline';
import { peltonInputSchema } from '../../types';
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

export const peltonCommand = async () => {
  try {
    console.log("=== Pelton Wheel Calculator ===\n");

    const input1 = await getInput("Enter pressure gauge reading: ");
    const input2 = await getInput("Enter w1 (kg): ");
    const input3 = await getInput("Enter w2 (kg): ");
    const input4 = await getInput("Enter N (rpm): ");
    const input5 = await getInput("Enter hf (mm): ");

    const input = peltonInputSchema.parse({
      pressure_gauge_reading: parseFloat(input1),
      w1: parseFloat(input2),
      w2: parseFloat(input3),
      N: parseFloat(input4),
      hf: parseFloat(input5),
    });

    const hf = input.hf * 0.001; // Convert mm to m
    const h = CONSTANTS.PELTON.hi - hf;
    const H = CONSTANTS.PELTON.h1 + CONSTANTS.PELTON.hi - hf;
    const T = (input.w1 - input.w2) * CONSTANTS.g * (CONSTANTS.PELTON.r_brake_wheel + CONSTANTS.PELTON.r_rope);
    const Pt = (2 * Math.PI * input.N * T) / 60;

    const Ha = calculateHa(input.pressure_gauge_reading, 'pelton');
    const { Va1 } = calculateQ(h, H, 0, 'pelton');
    const { Q } = calculateQ(h, H, Va1, 'pelton');
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