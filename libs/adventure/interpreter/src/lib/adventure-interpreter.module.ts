import { Module } from '@nestjs/common';
import { AdventureInterpreterService } from './adventure-interpreter.service';
import { SimulationRunnerProvider } from './simulation-runner.provider';
import { SimulationReportProvider } from './simulation-report.provider';
import { CommandInterpreterProvider } from './command-interpreter.provider';

@Module({
  providers: [
    AdventureInterpreterService,
    CommandInterpreterProvider,
    SimulationRunnerProvider,
    SimulationReportProvider,
  ],
  exports: [AdventureInterpreterService],
})
export class AdventureInterpreterModule {}
