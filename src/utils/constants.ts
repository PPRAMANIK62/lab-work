export const CONSTANTS = {
  // Common constants
  g: 9.81, // m/s²
  gamma: 9810, // N/m³
  Cd: 0.62,

  // Francis turbine specific
  FRANCIS: {
    r_brake_wheel: 0.15127, // m
    r_rope: 0.00875, // m
    h1: 0.275, // m
    hi: 0.255, // m
    B: 0.425, // m
    vertical_height_pressure_gauge_positive: 0.302, // m
    vertical_height_pressure_gauge_negative: 0.245, // m
    hf: 0.365, // m
  },

  // Pelton wheel specific
  PELTON: {
    r_brake_wheel: 0.15247, // m
    r_rope: 0.00732, // m
    h1: 0.2, // m
    hi: 0.206, // m
    B: 0.454, // m
    vertical_height_pressure_gauge: 0.205, // m
  },
} as const;