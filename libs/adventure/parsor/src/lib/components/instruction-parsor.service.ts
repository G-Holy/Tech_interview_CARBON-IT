import { Injectable } from '@nestjs/common';
import { InstructionFactoryProvider } from './instruction-factory.provider';

@Injectable()
export class InstructionParsorService {
  constructor(
    private readonly instructionFactory: InstructionFactoryProvider
  ) {}

  parseFileContent(rawLines: string[]) {
    const commands = rawLines.reduce((parsedCommands, rawLine) => {
      const sanitazedCommand = this.sanitizeLine(rawLine);

      const tokens = this.getTokens(sanitazedCommand);
      const identifier = tokens.shift();

      const commandParsor = this.instructionFactory.getParsor(identifier);
      if (commandParsor) {
        const command = commandParsor(tokens);
        parsedCommands.push(command);
      }
      return parsedCommands;
    }, []);

    console.log(commands);
    return commands;
  }

  private getTokens(rawInstruction: string) {
    return rawInstruction.split(' ');
  }

  private removeNonAlphaNumCharacters(rawInstruction: string) {
    return rawInstruction.replace(/[^\w\s]/gi, '');
  }

  private sanitizeLine(rawLine: string) {
    return this.removeNonAlphaNumCharacters(rawLine)
      .replace(/\s+/g, ' ')
      .trim();
  }
}
