import { Injectable } from '@nestjs/common';
import { CommandParserFactoryProvider } from './command-parser-factory.provider';
import { CommandLexerProvider } from './command-lexer.provider';
import {
  Command,
  FileContent,
  isCommandFlag,
} from '@treasure-hunt/adventure/core';

@Injectable()
export class CommandParserService {
  constructor(
    private readonly commandParserFactory: CommandParserFactoryProvider,
    private readonly lexor: CommandLexerProvider
  ) {}

  parseFileContent(lines: FileContent) {
    const commands = lines.reduce(this.parseLineCallback, []);
    return commands;
  }

  private parseLineCallback = (parsedCommands: Command[], line: string) => {
    const tokens = this.lexor.getTokens(line);
    const identifier = tokens.shift();

    if (identifier && isCommandFlag(identifier)) {
      const commandParser = this.commandParserFactory.getParser(identifier);
      if (commandParser) {
        const command = commandParser(tokens);
        parsedCommands.push(command);
      }
    }
    return parsedCommands;
  };
}
