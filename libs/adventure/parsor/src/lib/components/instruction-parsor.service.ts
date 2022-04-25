import { Injectable } from '@nestjs/common';
import { InstructionFactoryProvider } from './instruction-factory.provider';

@Injectable()
export class InstructionParsorService {
  private readonly SEPARATOR_TOKEN = ' - ';
  private readonly IDENTIFIER_INDEX = 0;

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

  private removeLineBreaks(rawLine: string) {
    return rawLine.replace(/(\r\n|\n|\r)/gm, '');
  }

  private sanitizeLine(rawLine: string) {
    const alphaNumLine = this.removeNonAlphaNumCharacters(rawLine);
    return alphaNumLine.replace(/\s+/g, ' ').trim();
  }
}
