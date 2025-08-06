import * as readline from "readline";

const r_brake_wheel = 0.15247; // m
const r_rope = 0.00732; // m
const Cd = 0.62;
const g = 9.81; // m/s2
const h1 = 0.2; // m
const hi = 0.206; // m
const B = 0.454; // m
const gamma = 9810; // N/m3
const vertical_height_pressure_gauge = 0.205; // m

// Create readline interface for CLI input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to get input from user
function getInput(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      resolve(answer);
    });
  });
}

const calculate_Ha = (pressure_gauge_reading: number) => {
  return (
    (pressure_gauge_reading * 10000 * g) / gamma +
    vertical_height_pressure_gauge
  );
};

const calculate_Q = (h: number, H: number, Va: number) => {
  const a = Math.pow(Va, 2);
  const b = 2 * g;
  const part1 = h + a / b;
  const part2 = a / b;
  const combined = Math.pow(part1, 2.5) - Math.pow(part2, 2.5);

  const Q = (8 / 15) * Cd * Math.sqrt(2 * g) * combined;

  const Va1 = Q / (B * H);

  return { Q: Number(Q.toFixed(6)), Va1 };
};

const calculate_parameters = (
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
  const Pa = gamma * Q * Ha;
  const eta = Pt / Pa * 100;

  return { N1, Q1, T1, Pt1, Pa, eta };
};

const three_decimal = (num: number) => {
  return Number(num.toFixed(3));
};

// Main function to handle input and calculations
async function main() {
  try {
    console.log("=== Pelton Wheel Calculator ===\n");

    // Get input variables
    let input1 = await getInput("Enter pressure gauge reading: ");
    let input2 = await getInput("Enter w1: "); // kg
    let input3 = await getInput("Enter w2: "); // kg
    let input4 = await getInput("Enter N: "); // rpm
    let input5 = await getInput("Enter hf: "); // mm

    // Convert string inputs to numbers
    const pressure_gauge_reading = parseFloat(input1);
    const w1 = parseFloat(input2);
    const w2 = parseFloat(input3);
    const N = parseFloat(input4);
    const hf = parseFloat(input5) * 0.001; // m

    // Validate inputs
    if (
      isNaN(pressure_gauge_reading) ||
      isNaN(w1) ||
      isNaN(w2) ||
      isNaN(N) ||
      isNaN(hf)
    ) {
      console.log("Error: Please enter valid numbers");
      rl.close();
      return;
    }

    // Required variables
    const h = hi - hf;
    const H = h1 + hi - hf;
    const T = (w1 - w2) * g * (r_brake_wheel - r_rope);
    const Pt = (2 * Math.PI * N * T) / 60;

    // Perform calculations
    const Ha = calculate_Ha(pressure_gauge_reading);
    const { Va1 } = calculate_Q(h, H, 0);
    const { Q } = calculate_Q(h, H, Va1);
    const { N1, Q1, T1, Pt1, Pa, eta } = calculate_parameters(N, Q, T, Pt, Ha);

    // Output results
    console.log("\n=== Results ===");
    console.log(`Ha: ${three_decimal(Ha)}`);
    console.log(`N1: ${three_decimal(N1)}`);
    console.log(`Q1: ${Q1.toFixed(6)}`);
    console.log(`T1: ${three_decimal(T1)}`);
    console.log(`Pt1: ${three_decimal(Pt1)}`);
    console.log(`Pa: ${three_decimal(Pa)}`);
    console.log(`eta: ${three_decimal(eta)}`);
  } catch (error) {
    console.log("Error:", error);
  } finally {
    rl.close();
  }
}

// Run the program
main();
