/**
 * Shared physical constants used across hydraulic turbine calculations
 */

// Universal physical constants
export const g = 9.81; // m/s² (gravitational acceleration)
export const gamma = 9810; // N/m³ (specific weight of water)
export const Cd = 0.62; // discharge coefficient

// Francis turbine specific constants
export const FRANCIS_CONSTANTS = {
  r_brake_wheel: 0.15127, // m
  r_rope: 0.00875, // m
  h1: 0.275, // m
  hi: 0.255, // m
  B: 0.425, // m
  hf: 0.365, // m
  vertical_height_pressure_gauge_positive: 0.302, // m
  vertical_height_pressure_gauge_negative: 0.245, // m
} as const;

// Pelton wheel specific constants
export const PELTON_CONSTANTS = {
  r_brake_wheel: 0.15247, // m
  r_rope: 0.00732, // m
  h1: 0.2, // m
  hi: 0.206, // m
  B: 0.454, // m
  vertical_height_pressure_gauge: 0.205, // m
} as const;

// Kaplan turbine specific constants
export const KAPLAN_CONSTANTS = {
  r_brake_wheel: 0.15247, // m
  r_rope: 0.00732, // m
  h0: 1, // m
  hi: 0.25, // m
  vertical_height_pressure_gauge: 0.25, // m
  Cd: 0.97, // discharge coefficient
  d1: 0.25, // m
  d2: 0.125, // m
  Sm: 13.6, // specific gravity for mercury (manometer)
} as const;
