import { CONSTANTS } from './constants';

export const calculateHa = (pressure: number, type: 'francis' | 'pelton', positive?: number, negative?: number): number => {
  if (type === 'francis') {
    return (
      ((positive! + negative!) * 10000 * CONSTANTS.g / CONSTANTS.gamma) +
      (CONSTANTS.FRANCIS.vertical_height_pressure_gauge_positive - CONSTANTS.FRANCIS.vertical_height_pressure_gauge_negative)
    );
  } else {
    return (
      (pressure * 10000 * CONSTANTS.g) / CONSTANTS.gamma +
      CONSTANTS.PELTON.vertical_height_pressure_gauge
    );
  }
};

export const calculateQ = (h: number, H: number, Va: number, type: 'francis' | 'pelton'): { Q: number; Va1: number } => {
  const a = Math.pow(Va, 2);
  const b = 2 * CONSTANTS.g;
  
  let Q: number;
  let combined: number;
  
  if (type === 'francis') {
    const part1 = h + (a / b);
    const part2 = a / b;
    combined = Math.pow(part1, 1.5) - Math.pow(part2, 1.5);
    Q = (2 / 3) * CONSTANTS.Cd * Math.sqrt(2 * CONSTANTS.g) * CONSTANTS.FRANCIS.B * combined;
  } else {
    const part1 = h + a / b;
    const part2 = a / b;
    combined = Math.pow(part1, 2.5) - Math.pow(part2, 2.5);
    Q = (8 / 15) * CONSTANTS.Cd * Math.sqrt(2 * CONSTANTS.g) * combined;
  }

  const Va1 = Q / (type === 'francis' ? CONSTANTS.FRANCIS.B : CONSTANTS.PELTON.B * H);
  
  return { Q: Number(Q.toFixed(6)), Va1 };
};

export const calculateParameters = (
  N: number,
  Q: number,
  T: number,
  Pt: number,
  Ha: number
) => {
  const N1 = N / Math.sqrt(Ha);
  const Q1 = Q / Math.sqrt(Ha);
  const T1 = T / Ha;
  const Pt1 = Pt / Math.pow(Ha, 1.5);
  const Pa = CONSTANTS.gamma * Q * Ha;
  const eta = Pt / Pa * 100;

  return { N1, Q1, T1, Pt1, Pa, eta };
};