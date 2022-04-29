import { Module } from '@nestjs/common';
import { AdventureInterpreter } from './adventure-interpreter.service';
import { AdventureRunnerProvider } from './adventure-runner.provider';
import { ReportFormatterProvider } from './report-formatter.provider';
import { CommandInterpreterProvider } from './command-interpreter.provider';

@Module({
  providers: [
    AdventureInterpreter,
    AdventureRunnerProvider,
    CommandInterpreterProvider,
    ReportFormatterProvider,
  ],
  exports: [AdventureInterpreter],
})
export class AdventureInterpreterModule {}
