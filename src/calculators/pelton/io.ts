/**
 * Input/Output handling for Pelton Wheel calculator
 */
import { PeltonInput, peltonInputSchema } from '../../shared/validation';
import { Prompt } from '../../shared/prompt';

export interface PeltonOptions extends Partial<PeltonInput> {
  json?: boolean;
}

/**
 * Collect input from command line arguments or interactive prompts
 */
export const collectInput = async (options: PeltonOptions): Promise<PeltonInput> => {
  // If all required options are provided via CLI, validate and return
  if (options.pg && options.w1 && options.w2 && options.rpm && options.hf) {
    return peltonInputSchema.parse({
      pg: options.pg,
      w1: options.w1,
      w2: options.w2,
      rpm: options.rpm,
      hf: options.hf,
    });
  }

  // Fall back to interactive prompts
  const prompt = new Prompt();
  try {
    const { theme, safeColorize } = await import('../../shared/colors');

    const title = safeColorize('=== Pelton Wheel Calculator ===', theme.title);
    const instruction = safeColorize('Please provide the following input values:', theme.info);
    console.log(`\n${title}\n`);
    console.log(`${instruction}\n`);

    const pgStr = await prompt.ask(safeColorize('Enter pressure gauge reading: ', theme.prompt));
    const w1Str = await prompt.ask(safeColorize('Enter w1 (kg): ', theme.prompt));
    const w2Str = await prompt.ask(safeColorize('Enter w2 (kg): ', theme.prompt));
    const rpmStr = await prompt.ask(safeColorize('Enter N (rpm): ', theme.prompt));
    const hfStr = await prompt.ask(safeColorize('Enter hf (mm): ', theme.prompt));

    return peltonInputSchema.parse({
      pg: pgStr,
      w1: w1Str,
      w2: w2Str,
      rpm: rpmStr,
      hf: hfStr,
    });
  } finally {
    prompt.close();
  }
};

/**
 * Validate input data using Zod schema
 */
export const validateInput = (input: any): PeltonInput => {
  return peltonInputSchema.parse(input);
};
