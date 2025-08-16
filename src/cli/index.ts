#!/usr/bin/env node

import { Command } from 'commander';
import { francisCommand } from './commands/francis.js';
import { peltonCommand } from './commands/pelton.js';

const program = new Command();

program
  .name('turbine-calculator')
  .description('CLI for hydraulic turbine calculations')
  .version('1.0.0');

program
  .command('francis')
  .description('Calculate Francis turbine parameters')
  .action(francisCommand);

program
  .command('pelton')
  .description('Calculate Pelton wheel parameters')
  .action(peltonCommand);

program.parse();