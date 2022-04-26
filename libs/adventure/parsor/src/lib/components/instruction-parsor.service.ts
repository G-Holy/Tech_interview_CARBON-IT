import { Injectable } from '@nestjs/common';
import { InstructionFactoryProvider } from './instruction-factory.provider';
import { LexorProvider } from './lexor.provider';

@Injectable()
export class InstructionParsorService {
  constructor(
    private readonly instructionFactory: InstructionFactoryProvider,
    private readonly lexor: LexorProvider
  ) {}

  parseFileContent(rawLines: string[]) {
    const commands = rawLines.reduce(this.parseLineCallback, []);

    console.log(commands);
    return commands;
  }

  private parseLineCallback(parsedCommands: unknown[], rawLine: string) {
    const tokens = this.lexor.getTokens(rawLine);
    const identifier = tokens.shift();

    const commandParsor = this.instructionFactory.getParsor(identifier);
    if (commandParsor) {
      const command = commandParsor(tokens);
      parsedCommands.push(command);
    }

    return parsedCommands;
  }
}
