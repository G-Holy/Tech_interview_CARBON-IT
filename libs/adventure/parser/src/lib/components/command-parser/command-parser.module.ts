import { Module } from '@nestjs/common';
import { CommandParserService } from './command-parser.service';
import { CommandParserFactoryProvider } from './command-parser-factory.provider';
import { CommandLexerProvider } from './command-lexer.provider';

@Module({
  providers: [
    CommandParserService,
    CommandParserFactoryProvider,
    CommandLexerProvider,
  ],
  exports: [CommandParserService],
})
export class CommandParserModule {}
