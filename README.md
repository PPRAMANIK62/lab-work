# Hydraulic Turbine Lab Toolkit

A comprehensive command-line toolkit for hydraulic turbine calculations, supporting Francis Turbine, Pelton Wheel, and Kaplan Turbine computations.

## Features

✨ **Multiple Calculator Support**

- Francis Turbine Calculator
- Pelton Wheel Calculator
- Kaplan Turbine Calculator

🔧 **Flexible Interface Options**

- Command-line interface with parameters
- Interactive mode for step-by-step input
- JSON output for automation and data processing

📊 **Input Validation**

- Comprehensive validation using Zod schemas
- Clear error messages for invalid inputs
- Type-safe calculations

🏗️ **Modular Architecture**

- Clean separation of concerns
- Code splitting for maintainability
- Shared utilities and constants

## Installation

### Global Installation (Recommended)

```bash
# Install globally from npm
npm install -g @ppramanik62/lab-works

# Now you can use the CLI anywhere
labworks --help
```

### Development Installation

```bash
# Clone the repository
git clone https://github.com/PPRAMANIK62/lab-works.git
cd lab-works

# Install dependencies
pnpm install

# Build the project
pnpm run build

# Run in development mode
pnpm run dev
```

## Usage

### Command Line Interface

#### Francis Turbine Calculator

```bash
# Basic usage (global installation)
labworks francis --ppg 0.325 --npg 0.245 --w1 15.2 --w2 12.1 --rpm 820

# With JSON output
labworks francis --ppg 0.325 --npg 0.245 --w1 15.2 --w2 12.1 --rpm 820 --json

# Development mode
pnpm run dev francis --ppg 0.325 --npg 0.245 --w1 15.2 --w2 12.1 --rpm 820
```

**Parameters:**

- `--ppg` - Positive pressure gauge reading
- `--npg` - Negative pressure gauge reading
- `--w1` - Weight 1 (kg)
- `--w2` - Weight 2 (kg)
- `--rpm` - RPM (revolutions per minute)
- `--json` - Output results in JSON format

#### Pelton Wheel Calculator

```bash
# Basic usage (global installation)
labworks pelton --pg 0.5 --w1 15.5 --w2 12.2 --rpm 850 --hf 120

# With JSON output
labworks pelton --pg 0.5 --w1 15.5 --w2 12.2 --rpm 850 --hf 120 --json

# Development mode
pnpm run dev pelton --pg 0.5 --w1 15.5 --w2 12.2 --rpm 850 --hf 120
```

**Parameters:**

- `--pg` - Pressure gauge reading
- `--w1` - Weight 1 (kg)
- `--w2` - Weight 2 (kg)
- `--rpm` - RPM (revolutions per minute)
- `--hf` - Height hf (mm)
- `--json` - Output results in JSON format

#### Kaplan Turbine Calculator

```bash
# Basic usage (global installation)
labworks kaplan --pg 0.4 --w1 16.0 --w2 13.5 --rpm 900 --lhs-mercury 25.5 --rhs-mercury 18.2

# With JSON output
labworks kaplan --pg 0.4 --w1 16.0 --w2 13.5 --rpm 900 --lhs-mercury 25.5 --rhs-mercury 18.2 --json

# Development mode
pnpm run dev kaplan --pg 0.4 --w1 16.0 --w2 13.5 --rpm 900 --lhs-mercury 25.5 --rhs-mercury 18.2
```

**Parameters:**

- `--pg` - Pressure gauge reading
- `--w1` - Weight 1 (kg)
- `--w2` - Weight 2 (kg)
- `--rpm` - RPM (revolutions per minute)
- `--lhs-mercury` - Left hand side manometer reading
- `--rhs-mercury` - Right hand side manometer reading
- `--json` - Output results in JSON format

### Interactive Mode

```bash
# Global installation
labworks interactive
# or
labworks i

# Development mode
pnpm run dev interactive
```

### List Available Calculators

```bash
# Global installation
labworks list

# Development mode
pnpm run dev list
```

### Help

```bash
# Global installation
labworks --help
labworks francis --help
labworks pelton --help
labworks kaplan --help

# Development mode
pnpm run dev --help
pnpm run dev francis --help
pnpm run dev pelton --help
pnpm run dev kaplan --help
```

## Example Outputs

### Francis Turbine (Human-readable)

```
=== Francis Turbine Results ===
Ha:  5.757
N1:  341.756
Q1:  0.012060
T1:  0.845
Pt1: 30.252
Pa:  1634.251
eta: 25.57
```

### Francis Turbine (JSON)

```json
{
  "calculator": "francis-turbine",
  "results": {
    "Ha": 5.757,
    "N1": 341.756,
    "Q1": 0.01206,
    "T1": 0.845,
    "Pt1": 30.252,
    "Pa": 1634.251,
    "eta": 25.57
  }
}
```

### Kaplan Turbine (Human-readable)

```
📊 Kaplan Turbine Calculation Results
══════════════════════════════════════════════════
Available Head (Ha): 5.250 m
Unit Speed (N1): 392.792 rpm
Unit Discharge (Q1): 0.228 m³/s
Unit Torque (T1): 0.746 N⋅m
Unit Power (Pt1): 30.704 W
Available Power (Pa): 26898.033 W
Efficiency (η): 1.373 %
══════════════════════════════════════════════════
```

### Kaplan Turbine (JSON)

```json
{
  "Ha": 5.25,
  "N1": 392.792,
  "Q1": 0.228,
  "T1": 0.746,
  "Pt1": 30.704,
  "Pa": 26898.033,
  "eta": 1.373
}
```

## Architecture

### Project Structure

```
src/
├── cli/
│   └── main.ts              # Main CLI entry point
├── calculators/
│   ├── francis/
│   │   ├── formulas.ts      # Pure calculation functions
│   │   ├── io.ts           # Input/output handling
│   │   └── index.ts        # Main orchestrator
│   ├── pelton/
│   │   ├── formulas.ts      # Pure calculation functions
│   │   ├── io.ts           # Input/output handling
│   │   └── index.ts        # Main orchestrator
│   └── kaplan/
│       ├── formulas.ts      # Pure calculation functions
│       ├── io.ts           # Input/output handling
│       └── index.ts        # Main orchestrator
└── shared/
    ├── constants.ts         # Physical constants
    ├── validation.ts        # Zod schemas
    ├── error.ts            # Error handling
    ├── prompt.ts           # Readline wrapper
    └── round.ts            # Number formatting
```

### Key Technologies

- **TypeScript** - Type-safe development
- **Commander.js** - CLI framework
- **Zod** - Runtime type validation
- **Node.js** - Runtime environment

## Development

### Scripts

```bash
# Development mode with hot reload
pnpm run dev

# Build for production
pnpm run build

# Run built version
pnpm run start

# Development with specific command
pnpm run dev francis --help
```

### Adding New Calculators

1. Create a new directory in `src/calculators/`
2. Implement the three core files: `formulas.ts`, `io.ts`, `index.ts`
3. Add the calculator to the main CLI in `src/cli/main.ts`
4. Update validation schemas if needed

## Validation

The toolkit includes comprehensive input validation:

- **Positive numbers** - All numeric inputs must be positive
- **Type conversion** - Automatic string to number conversion
- **Relational validation** - w1 must be greater than w2
- **Clear error messages** - User-friendly validation feedback

## License

ISC

## Author

Purbayan Pramanik
