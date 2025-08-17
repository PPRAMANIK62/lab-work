/**
 * Generic async readline wrapper for interactive prompts
 */
import * as readline from 'readline';

export interface PromptOptions {
  input?: NodeJS.ReadableStream;
  output?: NodeJS.WritableStream;
}

export class Prompt {
  private rl: readline.Interface;

  constructor(options: PromptOptions = {}) {
    // Configure readline to prevent input duplication
    this.rl = readline.createInterface({
      input: options.input || process.stdin,
      output: options.output || process.stdout,
      terminal: true,
      historySize: 0, // Disable history to prevent duplication issues
    });
    
    // Ensure clean input handling
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
    }
  }

  async ask(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer: string) => {
        resolve(answer.trim());
      });
    });
  }

  close(): void {
    this.rl.close();
  }
}
