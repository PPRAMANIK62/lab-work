/**
 * Input/Output handling for Kaplan Turbine calculator
 */
import { Prompt } from "../../shared/prompt";
import { KaplanInput, kaplanInputSchema } from "../../shared/validation";

export interface KaplanOptions extends Partial<KaplanInput> {
  json?: boolean;
}

/**
 * Collect input from command line arguments or interactive prompts
 */
export const collectInput = async (
  options: KaplanOptions
): Promise<KaplanInput> => {
  // If all required options are provided via CLI, validate and return
  if (
    options.pg &&
    options.w1 &&
    options.w2 &&
    options.rpm &&
    options.lhs_mercury &&
    options.rhs_mercury
  ) {
    return kaplanInputSchema.parse({
      pg: options.pg,
      w1: options.w1,
      w2: options.w2,
      rpm: options.rpm,
      lhs_mercury: options.lhs_mercury,
      rhs_mercury: options.rhs_mercury,
    });
  }

  // Fall back to interactive prompts
  const prompt = new Prompt();
  try {
    const { theme, safeColorize } = await import("../../shared/colors");

    const title = safeColorize(
      "=== Kaplan Turbine Calculator ===",
      theme.title
    );
    const instruction = safeColorize(
      "Please provide the following input values:",
      theme.info
    );
    console.log(`\n${title}\n`);
    console.log(`${instruction}\n`);

    const pgStr = await prompt.ask(
      safeColorize("Enter pressure gauge reading: ", theme.prompt)
    );
    const w1Str = await prompt.ask(
      safeColorize("Enter w1 (kg): ", theme.prompt)
    );
    const w2Str = await prompt.ask(
      safeColorize("Enter w2 (kg): ", theme.prompt)
    );
    const rpmStr = await prompt.ask(
      safeColorize("Enter N (rpm): ", theme.prompt)
    );
    const lhsMercuryStr = await prompt.ask(
      safeColorize("Enter LHS manometer reading: ", theme.prompt)
    );
    const rhsMercuryStr = await prompt.ask(
      safeColorize("Enter RHS manometer reading: ", theme.prompt)
    );

    return kaplanInputSchema.parse({
      pg: pgStr,
      w1: w1Str,
      w2: w2Str,
      rpm: rpmStr,
      lhs_mercury: lhsMercuryStr,
      rhs_mercury: rhsMercuryStr,
    });
  } finally {
    prompt.close();
  }
};

/**
 * Validate input data using Zod schema
 */
export const validateInput = (input: any): KaplanInput => {
  return kaplanInputSchema.parse(input);
};
