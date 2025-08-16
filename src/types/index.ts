import { z } from 'zod';

export const francisInputSchema = z.object({
  pressure_gauge_reading_positive: z.number().positive(),
  pressure_gauge_reading_negative: z.number().positive(),
  w1: z.number().positive(),
  w2: z.number().positive(),
  N: z.number().positive(),
});

export const peltonInputSchema = z.object({
  pressure_gauge_reading: z.number().positive(),
  w1: z.number().positive(),
  w2: z.number().positive(),
  N: z.number().positive(),
  hf: z.number().positive(),
});

export const calculationResultSchema = z.object({
  Ha: z.number(),
  N1: z.number(),
  Q1: z.number(),
  T1: z.number(),
  Pt1: z.number(),
  Pa: z.number(),
  eta: z.number(),
});

export type FrancisInput = z.infer<typeof francisInputSchema>;
export type PeltonInput = z.infer<typeof peltonInputSchema>;
export type CalculationResult = z.infer<typeof calculationResultSchema>;