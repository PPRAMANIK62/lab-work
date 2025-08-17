/**
 * Pelton Wheel Calculator - Main orchestrator
 */
import { calculatePelton, PeltonResults } from './formulas';
import { collectInput, PeltonOptions } from './io';
import { threeDecimal, formatNumber } from '../../shared/round';
import { theme, safeColorize } from '../../shared/colors';

/**
 * Print results in human-readable format
 */
export const printResults = (results: PeltonResults): void => {
  const header = safeColorize('\n=== Pelton Wheel Results ===', theme.header);
  console.log(header);
  
  const labels = {
    Ha: safeColorize('Ha: ', theme.label),
    N1: safeColorize('N1: ', theme.label),
    Q1: safeColorize('Q1: ', theme.label),
    T1: safeColorize('T1: ', theme.label),
    Pt1: safeColorize('Pt1:', theme.label),
    Pa: safeColorize('Pa: ', theme.label),
    eta: safeColorize('eta:', theme.label),
  };
  
  console.log(`${labels.Ha} ${safeColorize(threeDecimal(results.Ha).toString(), theme.value)}`);
  console.log(`${labels.N1} ${safeColorize(threeDecimal(results.N1).toString(), theme.value)}`);
  console.log(`${labels.Q1} ${safeColorize(formatNumber(results.Q1, 6), theme.value)}`);
  console.log(`${labels.T1} ${safeColorize(threeDecimal(results.T1).toString(), theme.value)}`);
  console.log(`${labels.Pt1} ${safeColorize(threeDecimal(results.Pt1).toString(), theme.value)}`);
  console.log(`${labels.Pa} ${safeColorize(threeDecimal(results.Pa).toString(), theme.value)}`);
  console.log(`${labels.eta} ${safeColorize(threeDecimal(results.eta).toString(), theme.value)}`);
  console.log('');
};

/**
 * Print results in JSON format
 */
export const printResultsJson = (results: PeltonResults): void => {
  console.log(JSON.stringify({
    calculator: 'pelton-wheel',
    results: {
      Ha: threeDecimal(results.Ha),
      N1: threeDecimal(results.N1),
      Q1: Number(formatNumber(results.Q1, 6)),
      T1: threeDecimal(results.T1),
      Pt1: threeDecimal(results.Pt1),
      Pa: threeDecimal(results.Pa),
      eta: threeDecimal(results.eta),
    }
  }, null, 2));
};

/**
 * Run the Pelton Wheel calculator
 */
export const runPelton = async (options: PeltonOptions = {}): Promise<void> => {
  try {
    const input = await collectInput(options);
    const results = calculatePelton(
      input.pg,
      input.w1,
      input.w2,
      input.rpm,
      input.hf
    );

    if (options.json) {
      printResultsJson(results);
    } else {
      printResults(results);
    }
  } catch (error) {
    const { handleError } = await import('../../shared/error');
    handleError(error);
  }
};
