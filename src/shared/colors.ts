/**
 * Terminal color utilities for enhanced CLI appearance
 */

// ANSI escape codes for terminal colors
const RESET = '\x1b[0m';

// Color definitions
const colors = {
  bright: {
    black: '\x1b[38;2;68;75;106m',    // #444b6a
    blue: '\x1b[38;2;125;166;255m',   // #7da6ff
    cyan: '\x1b[38;2;13;185;215m',    // #0db9d7
    green: '\x1b[38;2;185;242;124m',  // #b9f27c
    magenta: '\x1b[38;2;187;154;247m', // #bb9af7
    red: '\x1b[38;2;255;122;147m',    // #ff7a93
    white: '\x1b[38;2;172;176;208m',  // #acb0d0
    yellow: '\x1b[38;2;255;158;100m', // #ff9e64
  },
  normal: {
    black: '\x1b[38;2;50;52;74m',     // #32344a
    blue: '\x1b[38;2;122;162;247m',   // #7aa2f7
    cyan: '\x1b[38;2;68;157;171m',    // #449dab
    green: '\x1b[38;2;158;206;106m',  // #9ece6a
    magenta: '\x1b[38;2;173;142;230m', // #ad8ee6
    red: '\x1b[38;2;247;118;142m',    // #f7768e
    white: '\x1b[38;2;120;124;153m',  // #787c99
    yellow: '\x1b[38;2;224;175;104m', // #e0af68
  }
};

/**
 * Apply color to text
 */
export const colorize = (text: string, color: string): string => {
  return `${color}${text}${RESET}`;
};

/**
 * Themed color functions for different UI elements
 */
export const theme = {
  // Headers and titles
  header: (text: string) => colorize(text, colors.bright.blue),
  title: (text: string) => colorize(text, colors.bright.magenta),
  
  // Results and values
  label: (text: string) => colorize(text, colors.normal.cyan),
  value: (text: string) => colorize(text, colors.bright.white),
  
  // Status indicators
  success: (text: string) => colorize(text, colors.bright.green),
  warning: (text: string) => colorize(text, colors.bright.yellow),
  error: (text: string) => colorize(text, colors.bright.red),
  
  // Interactive elements
  prompt: (text: string) => colorize(text, colors.normal.blue),
  info: (text: string) => colorize(text, colors.normal.white),
  
  // Special elements
  accent: (text: string) => colorize(text, colors.bright.cyan),
  subtle: (text: string) => colorize(text, colors.normal.black),
  
  // Emojis and icons (no color change, just pass through)
  emoji: (text: string) => text,
};

/**
 * Check if colors should be disabled (for CI/non-TTY environments)
 */
export const shouldUseColors = (): boolean => {
  return process.stdout.isTTY && process.env.NO_COLOR !== '1';
};

/**
 * Conditionally apply colors based on environment
 */
export const safeColorize = (text: string, colorFn: (text: string) => string): string => {
  return shouldUseColors() ? colorFn(text) : text;
};
