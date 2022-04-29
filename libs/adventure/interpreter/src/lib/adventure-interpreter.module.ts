import { Module } from '@nestjs/common';
import { AdventureInterpreter } from './adventure-interpreter.service';
import { SimulationRunnerProvider } from './simulation-runner.provider';
import { SimulationReportProvider } from './simulation-report.provider';
import { CommandInterpreterProvider } from './command-interpreter.provider';

@Module({
  providers: [
    AdventureInterpreter,
    SimulationRunnerProvider,
    CommandInterpreterProvider,
    SimulationReportProvider,
  ],
  exports: [AdventureInterpreter],
})
export class AdventureInterpreterModule {}
