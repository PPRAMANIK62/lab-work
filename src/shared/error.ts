/**
 * Error handling utilities for validation and general errors
 */
import { ZodError } from 'zod';
import { theme, safeColorize } from './colors';

/**
 * Format and print Zod validation errors in a user-friendly way
 */
export const printZodErrors = (error: ZodError): void => {
  console.error(`\n${safeColorize('❌ Validation Error:', theme.error)}`);
  error.issues.forEach((err) => {
    const field = err.path.length > 0 ? `${err.path.join('.')}` : 'input';
    const fieldColored = safeColorize(field, theme.accent);
    const messageColored = safeColorize(err.message, theme.info);
    console.error(`  ${safeColorize('•', theme.warning)} ${fieldColored}: ${messageColored}`);
  });
  console.error('');
};

/**
 * Handle errors and exit with proper code
 */
export const handleError = (error: unknown, exitCode: number = 1): never => {
  if (error instanceof ZodError) {
    printZodErrors(error);
  } else if (error instanceof Error) {
    const errorMsg = safeColorize('❌ Error:', theme.error);
    const message = safeColorize(error.message, theme.info);
    console.error(`\n${errorMsg} ${message}\n`);
  } else {
    const errorMsg = safeColorize('❌ An unknown error occurred', theme.error);
    console.error(`\n${errorMsg}\n`);
  }
  process.exit(exitCode);
};
