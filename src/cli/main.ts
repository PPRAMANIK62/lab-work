#!/usr/bin/env node
/**
 * Main CLI entry point for Hydraulic Turbine Lab Toolkit
 */
import { Command } from 'commander';
import { runFrancis } from '../calculators/francis';
import { runPelton } from '../calculators/pelton';
import { handleError } from '../shared/error';

const program = new Command();

program
  .name('lab-work')
  .description('Hydraulic Turbine Lab Toolkit')
  .version('1.0.0');

// Francis Turbine subcommand
program
  .command('francis')
  .description('Run Francis Turbine calculations')
  .option('--ppg <value>', 'Positive pressure gauge reading')
  .option('--npg <value>', 'Negative pressure gauge reading')
  .option('--w1 <value>', 'Weight 1 (kg)')
  .option('--w2 <value>', 'Weight 2 (kg)')
  .option('--rpm <value>', 'RPM (revolutions per minute)')
  .option('--json', 'Output results in JSON format')
  .action(async (options) => {
    try {
      await runFrancis({
        ppg: options.ppg ? Number(options.ppg) : undefined,
        npg: options.npg ? Number(options.npg) : undefined,
        w1: options.w1 ? Number(options.w1) : undefined,
        w2: options.w2 ? Number(options.w2) : undefined,
        rpm: options.rpm ? Number(options.rpm) : undefined,
        json: options.json,
      });
    } catch (error) {
      handleError(error);
    }
  });

// Pelton Wheel subcommand
program
  .command('pelton')
  .description('Run Pelton Wheel calculations')
  .option('--pg <value>', 'Pressure gauge reading')
  .option('--w1 <value>', 'Weight 1 (kg)')
  .option('--w2 <value>', 'Weight 2 (kg)')
  .option('--rpm <value>', 'RPM (revolutions per minute)')
  .option('--hf <value>', 'Height hf (mm)')
  .option('--json', 'Output results in JSON format')
  .action(async (options) => {
    try {
      await runPelton({
        pg: options.pg ? Number(options.pg) : undefined,
        w1: options.w1 ? Number(options.w1) : undefined,
        w2: options.w2 ? Number(options.w2) : undefined,
        rpm: options.rpm ? Number(options.rpm) : undefined,
        hf: options.hf ? Number(options.hf) : undefined,
        json: options.json,
      });
    } catch (error) {
      handleError(error);
    }
  });

// Help command - list available calculators
program
  .command('list')
  .description('List available calculators')
  .action(async () => {
    const { theme, safeColorize } = await import('../shared/colors');
    
    const title = safeColorize('🔧 Available Hydraulic Turbine Calculators:', theme.title);
    const francis = safeColorize('francis', theme.accent);
    const pelton = safeColorize('pelton', theme.accent);
    const francisDesc = safeColorize('Francis Turbine Calculator', theme.info);
    const peltonDesc = safeColorize('Pelton Wheel Calculator', theme.info);
    const usage = safeColorize('Use "lab-work <calculator> --help" for usage information.', theme.subtle);
    
    console.log(`\n${title}\n`);
    console.log(`  ${francis}  - ${francisDesc}`);
    console.log(`  ${pelton}   - ${peltonDesc}`);
    console.log(`\n${usage}\n`);
  });

// Interactive mode - let user choose calculator
program
  .command('interactive')
  .alias('i')
  .description('Start interactive mode to choose calculator')
  .action(async () => {
    const { Prompt } = await import('../shared/prompt');
    const { theme, safeColorize } = await import('../shared/colors');
    const prompt = new Prompt();
    
    try {
      const title = safeColorize('🔧 Hydraulic Turbine Lab Toolkit', theme.title);
      const availableText = safeColorize('Available calculators:', theme.info);
      const francis = safeColorize('1. Francis Turbine', theme.accent);
      const pelton = safeColorize('2. Pelton Wheel', theme.accent);
      
      console.log(`\n${title}\n`);
      console.log(availableText);
      console.log(`  ${francis}`);
      console.log(`  ${pelton}`);
      
      const choice = await prompt.ask(safeColorize('\nChoose calculator (1-2): ', theme.prompt));
      
      switch (choice.trim()) {
        case '1':
          const startingFrancis = safeColorize('Starting Francis Turbine calculator...', theme.success);
          console.log(`\n${startingFrancis}\n`);
          await runFrancis({});
          break;
        case '2':
          const startingPelton = safeColorize('Starting Pelton Wheel calculator...', theme.success);
          console.log(`\n${startingPelton}\n`);
          await runPelton({});
          break;
        default:
          const errorMsg = safeColorize('❌ Invalid choice. Please select 1 or 2.', theme.error);
          console.log(errorMsg);
          process.exit(1);
      }
    } catch (error) {
      handleError(error);
    } finally {
      prompt.close();
    }
  });

// Default action when no subcommand is provided
if (process.argv.length <= 2) {
  program.outputHelp();
  console.log('\n💡 Tip: Use "lab-work interactive" to start interactive mode\n');
}

// Parse command line arguments
program.parse();
