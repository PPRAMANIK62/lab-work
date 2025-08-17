/**
 * Input/Output handling for Francis Turbine calculator
 */
import { FrancisInput, francisInputSchema } from '../../shared/validation';
import { Prompt } from '../../shared/prompt';

export interface FrancisOptions extends Partial<FrancisInput> {
  json?: boolean;
}

/**
 * Collect input from command line arguments or interactive prompts
 */
export const collectInput = async (options: FrancisOptions): Promise<FrancisInput> => {
  // If all required options are provided via CLI, validate and return
  if (options.ppg && options.npg && options.w1 && options.w2 && options.rpm) {
    return francisInputSchema.parse({
      ppg: options.ppg,
      npg: options.npg,
      w1: options.w1,
      w2: options.w2,
      rpm: options.rpm,
    });
  }

  // Fall back to interactive prompts
  const prompt = new Prompt();
  try {
    const { theme, safeColorize } = await import('../../shared/colors');

    const title = safeColorize('=== Francis Turbine Calculator ===', theme.title);
    const instruction = safeColorize('Please provide the following input values:', theme.info);
    console.log(`\n${title}\n`);
    console.log(`${instruction}\n`);

    const ppgStr = await prompt.ask(safeColorize('Enter positive pressure gauge reading: ', theme.prompt));
    const npgStr = await prompt.ask(safeColorize('Enter negative pressure gauge reading: ', theme.prompt));
    const w1Str = await prompt.ask(safeColorize('Enter w1 (kg): ', theme.prompt));
    const w2Str = await prompt.ask(safeColorize('Enter w2 (kg): ', theme.prompt));
    const rpmStr = await prompt.ask(safeColorize('Enter N (rpm): ', theme.prompt));

    return francisInputSchema.parse({
      ppg: ppgStr,
      npg: npgStr,
      w1: w1Str,
      w2: w2Str,
      rpm: rpmStr,
    });
  } finally {
    prompt.close();
  }
};

/**
 * Validate input data using Zod schema
 */
export const validateInput = (input: any): FrancisInput => {
  return francisInputSchema.parse(input);
};
