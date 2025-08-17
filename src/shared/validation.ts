/**
 * Zod validation schemas for input validation
 */
import { z } from 'zod';

/**
 * Basic positive number schema with automatic number transformation
 */
export const positiveNumber = z
  .string()
  .or(z.number())
  .transform((val) => {
    const num = typeof val === 'string' ? parseFloat(val) : val;
    if (isNaN(num)) throw new Error('Invalid number format');
    return num;
  })
  .refine((val) => val > 0, {
    message: 'Value must be positive',
  });

/**
 * Non-negative number schema (allows zero)
 */
export const nonNegativeNumber = z
  .string()
  .or(z.number())
  .transform((val) => {
    const num = typeof val === 'string' ? parseFloat(val) : val;
    if (isNaN(num)) throw new Error('Invalid number format');
    return num;
  })
  .refine((val) => val >= 0, {
    message: 'Value must be non-negative',
  });

/**
 * Francis turbine input validation schema
 */
export const francisInputSchema = z
  .object({
    ppg: positiveNumber.describe('Positive pressure gauge reading'),
    npg: positiveNumber.describe('Negative pressure gauge reading'),
    w1: positiveNumber.describe('Weight 1 (kg)'),
    w2: positiveNumber.describe('Weight 2 (kg)'),
    rpm: positiveNumber.describe('RPM (revolutions per minute)'),
  })
  .refine((data) => data.w1 > data.w2, {
    message: 'Weight 1 (w1) must be greater than Weight 2 (w2)',
    path: ['w1'],
  });

/**
 * Pelton wheel input validation schema
 */
export const peltonInputSchema = z
  .object({
    pg: positiveNumber.describe('Pressure gauge reading'),
    w1: positiveNumber.describe('Weight 1 (kg)'),
    w2: positiveNumber.describe('Weight 2 (kg)'),
    rpm: positiveNumber.describe('RPM (revolutions per minute)'),
    hf: positiveNumber.describe('Height hf (mm)'),
  })
  .refine((data) => data.w1 > data.w2, {
    message: 'Weight 1 (w1) must be greater than Weight 2 (w2)',
    path: ['w1'],
  });

// Export type definitions for TypeScript
export type FrancisInput = z.infer<typeof francisInputSchema>;
export type PeltonInput = z.infer<typeof peltonInputSchema>;
