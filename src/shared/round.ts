/**
 * Utility functions for number rounding and formatting
 */

/**
 * Round number to three decimal places
 */
export const threeDecimal = (num: number): number => {
  return Number(num.toFixed(3));
};

/**
 * Round number to specified decimal places
 */
export const roundTo = (num: number, decimals: number): number => {
  return Number(num.toFixed(decimals));
};

/**
 * Format number for display with consistent decimal places
 */
export const formatNumber = (num: number, decimals: number = 3): string => {
  return num.toFixed(decimals);
};
