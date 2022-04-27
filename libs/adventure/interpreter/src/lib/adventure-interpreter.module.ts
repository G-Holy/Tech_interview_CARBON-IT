import { Module } from '@nestjs/common';
import { AdventureInterpreter } from './adventure-interpreter.service';
import { CommandInterpreterProvider } from './command-interpreter.provider';

@Module({
  providers: [AdventureInterpreter, CommandInterpreterProvider],
  exports: [AdventureInterpreter],
})
export class AdventureInterpreterModule {}
