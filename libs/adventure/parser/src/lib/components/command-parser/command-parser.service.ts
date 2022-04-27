import { Injectable } from '@nestjs/common';
import { CommandParserFactoryProvider } from './command-parser-factory.provider';
import { CommandLexerProvider } from './command-lexer.provider';
import {
  Command,
  FileContent,
  isCommandFlag,
} from '@treasure-hunt/adventure/types';

@Injectable()
export class CommandParserService {
  constructor(
    private readonly commandParserFactory: CommandParserFactoryProvider,
    private readonly lexor: CommandLexerProvider
  ) {}

  // TODO: clean this function into smaller functions
  parseFileContent(lines: FileContent) {
    const commands = lines.reduce(this.parseLineCallback, []);
    return commands;
  }

  private parseLineCallback = (parsedCommands: Command[], line: string) => {
    const tokens = this.lexor.getTokens(line);
    const identifier = tokens.shift();

    if (isCommandFlag(identifier)) {
      const commandParser = this.commandParserFactory.getParser(identifier);
      if (commandParser) {
        const command = commandParser(tokens);
        // TODO avec class + validation : const command = commandParser.parse(tokens);
        // TODO: typer les commandes
        parsedCommands.push(command);
      }
    }
    return parsedCommands;
  };
}
