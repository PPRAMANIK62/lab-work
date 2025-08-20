/**
 * Pure calculation functions for Kaplan Turbine
 */

import { KAPLAN_CONSTANTS, g, gamma } from "../../shared/constants";

export interface KaplanResults {
  Ha: number;
  N1: number;
  Q1: number;
  T1: number;
  Pt1: number;
  Pa: number;
  eta: number;
}

/**
 * Calculate available head (Ha)
 */
export const calculateHa = (pressureGaugeReadingPositive: number): number => {
  const { vertical_height_pressure_gauge, h0 } = KAPLAN_CONSTANTS;
  return (
    (pressureGaugeReadingPositive * 10000 * g) / gamma +
    vertical_height_pressure_gauge +
    h0
  );
};

/**
 * Calculate discharge (Q)
 */
export const calculateQ = (lhs_mercury: number, rhs_mercury: number): number => {
  const { Cd, d1, d2, Sm } = KAPLAN_CONSTANTS;
  const A1 = (Math.PI * Math.pow(d1, 2)) / 4;
  const A2 = (Math.PI * Math.pow(d2, 2)) / 4;
  const Hm = (lhs_mercury - rhs_mercury) * 0.01;

  const a = 2 * g * Hm * (Sm - 1);
  const b = Math.pow(A1, 2) - Math.pow(A2, 2);

  return Cd * A1 * A2 * Math.sqrt(a / b);
};

/**
 * Calculate performance parameters
 */
export const calculateParameters = (
  N: number,
  Q: number,
  T: number,
  Pt: number,
  Ha: number
): Omit<KaplanResults, "Ha"> => {
  const N1 = N / Math.sqrt(Ha);
  const Q1 = Q / Math.sqrt(Ha);
  const T1 = T / Ha;
  const Pt1 = Pt / Math.pow(Ha, 1.5);
  const Pa = gamma * Q * Ha;
  const eta = (Pt / Pa) * 100;

  return { N1, Q1, T1, Pt1, Pa, eta };
};

/**
 * Calculate torque from weights
 */
export const calculateTorque = (w1: number, w2: number): number => {
  const { r_brake_wheel, r_rope } = KAPLAN_CONSTANTS;
  return (w1 - w2) * g * (r_brake_wheel + r_rope);
};

/**
 * Calculate power from torque and RPM
 */
export const calculatePower = (N: number, T: number): number => {
  return (2 * Math.PI * N * T) / 60;
};

/**
 * Main calculation function
 */
export const calculateKaplan = (
  pg: number,
  w1: number,
  w2: number,
  rpm: number,
  lhs_mercury: number,
  rhs_mercury: number
): KaplanResults => {
  const T = calculateTorque(w1, w2);
  const Pt = calculatePower(rpm, T);
  const Ha = calculateHa(pg);
  const Q = calculateQ(lhs_mercury, rhs_mercury);
  const { N1, Q1, T1, Pt1, Pa, eta } = calculateParameters(rpm, Q, T, Pt, Ha);

  return { Ha, N1, Q1, T1, Pt1, Pa, eta };
};
