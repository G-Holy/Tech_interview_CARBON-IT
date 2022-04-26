import { Injectable } from '@nestjs/common';
import { CommandParsorFactoryProvider } from './command-parsor-factory.provider';
import { CommandLexorProvider } from './command-lexor.provider';
import { FileContent, isCommandFlag } from '@treasure-hunt/adventure/types';

@Injectable()
export class CommandParsorService {
  constructor(
    private readonly commandParsorFactory: CommandParsorFactoryProvider,
    private readonly lexor: CommandLexorProvider
  ) {}

  // TODO: clean this function into smaller functions
  parseFileContent(lines: FileContent) {
    const commands = lines.reduce(this.parseLineCallback, []);

    console.log(commands);
    return commands;
  }

  private parseLineCallback = (parsedCommands: unknown[], line: string) => {
    const tokens = this.lexor.getTokens(line);
    const identifier = tokens.shift();

    if (isCommandFlag(identifier)) {
      const commandParsor = this.commandParsorFactory.getParsor(identifier);
      if (commandParsor) {
        const command = commandParsor(tokens);
        // TODO avec class + validation : const command = commandParsor.parse(tokens);
        // TODO: typer les commandes
        parsedCommands.push(command);
      }

      return parsedCommands;
    }
  };
}
