import { Injectable } from '@nestjs/common';
import { CommandParsorFactoryProvider } from './command-parsor-factory.provider';
import { CommandLexorProvider } from './command-lexor.provider';

@Injectable()
export class CommandParsorService {
  constructor(
    private readonly commandParsorFactory: CommandParsorFactoryProvider,
    private readonly lexor: CommandLexorProvider
  ) {}

  parseFileContent(rawLines: string[]) {
    const commands = rawLines.reduce(this.parseLineCallback, []);

    console.log(commands);
    return commands;
  }

  private parseLineCallback = (parsedCommands: unknown[], rawLine: string) => {
    const tokens = this.lexor.getTokens(rawLine);
    const identifier = tokens.shift();

    const commandParsor = this.commandParsorFactory.getParsor(identifier);
    if (commandParsor) {
      const command = commandParsor(tokens);
      // TODO avec class + validation : const command = commandParsor.parse(tokens);
      parsedCommands.push(command);
    }

    return parsedCommands;
  };
}
