/**
 * Kaplan Turbine Calculator - Main orchestrator
 */
import { safeColorize, theme } from "../../shared/colors";
import { formatNumber, threeDecimal } from "../../shared/round";
import { calculateKaplan, KaplanResults } from "./formulas";
import { collectInput, KaplanOptions } from "./io";

/**
 * Print results in human-readable format
 */
const printResults = (results: KaplanResults): void => {
  const title = safeColorize(
    "📊 Kaplan Turbine Calculation Results",
    theme.title
  );
  const separator = safeColorize("═".repeat(50), theme.accent);

  console.log(`\n${title}`);
  console.log(separator);

  const formatResult = (label: string, value: number, unit: string) => {
    const labelColored = safeColorize(`${label}:`, theme.info);
    const valueColored = safeColorize(formatNumber(value), theme.success);
    const unitColored = safeColorize(unit, theme.subtle);
    return `${labelColored.padEnd(35)} ${valueColored} ${unitColored}`;
  };

  console.log(formatResult("Available Head (Ha)", results.Ha, "m"));
  console.log(formatResult("Unit Speed (N1)", results.N1, "rpm"));
  console.log(formatResult("Unit Discharge (Q1)", results.Q1, "m³/s"));
  console.log(formatResult("Unit Torque (T1)", results.T1, "N⋅m"));
  console.log(formatResult("Unit Power (Pt1)", results.Pt1, "W"));
  console.log(formatResult("Available Power (Pa)", results.Pa, "W"));
  console.log(formatResult("Efficiency (η)", results.eta, "%"));

  console.log(separator);
};

/**
 * Print results in JSON format
 */
const printResultsJson = (results: KaplanResults): void => {
  const roundedResults = {
    Ha: threeDecimal(results.Ha),
    N1: threeDecimal(results.N1),
    Q1: threeDecimal(results.Q1),
    T1: threeDecimal(results.T1),
    Pt1: threeDecimal(results.Pt1),
    Pa: threeDecimal(results.Pa),
    eta: threeDecimal(results.eta),
  };

  console.log(JSON.stringify(roundedResults, null, 2));
};

/**
 * Run the Kaplan Turbine calculator
 */
export const runKaplan = async (options: KaplanOptions = {}): Promise<void> => {
  try {
    const input = await collectInput(options);
    const results = calculateKaplan(
      input.pg,
      input.w1,
      input.w2,
      input.rpm,
      input.lhs_mercury,
      input.rhs_mercury
    );

    if (options.json) {
      printResultsJson(results);
    } else {
      printResults(results);
    }
  } catch (error) {
    const { handleError } = await import("../../shared/error");
    handleError(error);
  }
};
