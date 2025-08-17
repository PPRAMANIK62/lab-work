// Francis Turbine inputs based on the actual package
export interface FrancisTurbineInputs {
  ppg: number; // Positive pressure gauge reading
  npg: number; // Negative pressure gauge reading
  w1: number; // Weight 1 (kg)
  w2: number; // Weight 2 (kg)
  rpm: number; // RPM (revolutions per minute)
}

// Pelton Wheel inputs based on the actual package
export interface PeltonWheelInputs {
  pg: number; // Pressure gauge reading
  w1: number; // Weight 1 (kg)
  w2: number; // Weight 2 (kg)
  rpm: number; // RPM (revolutions per minute)
  hf: number; // hf (mm)
}

// Results from the actual package
export interface FrancisResults {
  Ha: number; // Available head
  N1: number; // Unit speed
  Q1: number; // Unit discharge
  T1: number; // Unit torque
  Pt1: number; // Unit power
  Pa: number; // Available power
  eta: number; // Efficiency
}

export interface PeltonResults {
  Ha: number; // Available head
  N1: number; // Unit speed
  Q1: number; // Unit discharge
  T1: number; // Unit torque
  Pt1: number; // Unit power
  Pa: number; // Available power
  eta: number; // Efficiency
}

export interface CalculatorResult {
  [key: string]: number | string;
}

export type CalculatorType = "francis" | "pelton";
