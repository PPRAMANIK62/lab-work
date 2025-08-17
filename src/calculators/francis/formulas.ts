/**
 * Pure calculation functions for Francis Turbine
 */
import { g, gamma, Cd, FRANCIS_CONSTANTS } from '../../shared/constants';

export interface FrancisResults {
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
export const calculateHa = (
  pressureGaugeReadingPositive: number,
  pressureGaugeReadingNegative: number
): number => {
  const { vertical_height_pressure_gauge_positive, vertical_height_pressure_gauge_negative } = FRANCIS_CONSTANTS;
  return (
    ((pressureGaugeReadingPositive + pressureGaugeReadingNegative) * 10000 * g) / gamma +
    (vertical_height_pressure_gauge_positive - vertical_height_pressure_gauge_negative)
  );
};

/**
 * Calculate discharge (Q) iteratively
 */
export const calculateQ = (h: number, H: number, Va: number): { Q: number; Va1: number } => {
  const { B } = FRANCIS_CONSTANTS;
  const a = Math.pow(Va, 2);
  const b = 2 * g;
  const part1 = h + a / b;
  const part2 = a / b;
  const combined = Math.pow(part1, 1.5) - Math.pow(part2, 1.5);

  const Q = (2 / 3) * Cd * Math.sqrt(2 * g) * B * combined;
  const Va1 = Q / (B * H);

  return { Q: Number(Q.toFixed(6)), Va1 };
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
): Omit<FrancisResults, 'Ha'> => {
  const N1 = N / Math.sqrt(Ha);
  const Q1 = Q / Math.sqrt(Ha);
  const T1 = T / Ha;
  const Pt1 = Pt / Math.pow(Ha, 1.5);
  const Pa = gamma * Q * Ha;
  const eta = (Pt / Pa) * 100;

  return { N1, Q1, T1, Pt1, Pa, eta };
};

/**
 * Calculate torque from weights and RPM
 */
export const calculateTorque = (w1: number, w2: number): number => {
  const { r_brake_wheel, r_rope } = FRANCIS_CONSTANTS;
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
export const calculateFrancis = (
  ppg: number,
  npg: number,
  w1: number,
  w2: number,
  rpm: number
): FrancisResults => {
  const { hf, hi, h1 } = FRANCIS_CONSTANTS;
  
  const h = hf - hi;
  const H = h1 + hf - hi;
  const T = calculateTorque(w1, w2);
  const Pt = calculatePower(rpm, T);
  const Ha = calculateHa(ppg, npg);
  
  const { Va1 } = calculateQ(h, H, 0);
  const { Q } = calculateQ(h, H, Va1);
  const { N1, Q1, T1, Pt1, Pa, eta } = calculateParameters(rpm, Q, T, Pt, Ha);
  
  return { Ha, N1, Q1, T1, Pt1, Pa, eta };
};
