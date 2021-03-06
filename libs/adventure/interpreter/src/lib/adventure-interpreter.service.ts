import { Injectable, Scope } from '@nestjs/common';
import { CommandInterpreterProvider } from './command-interpreter.provider';
import { Command, Map } from '@treasure-hunt/adventure/core';
import { SimulationRunnerProvider } from './simulation-runner.provider';
import { SimulationReportProvider } from './simulation-report.provider';

@Injectable({ scope: Scope.REQUEST })
export class AdventureInterpreterService {
  constructor(
    private readonly simulationRunner: SimulationRunnerProvider,
    private readonly simulationReport: SimulationReportProvider,
    private readonly commandInterpreter: CommandInterpreterProvider
  ) {}

  public interpreteSimulation(commands: Command[]) {
    const mapConfiguration =
      this.commandInterpreter.getMapConfiguration(commands);
    const map = new Map(mapConfiguration);
    const adventurers = this.commandInterpreter.getAdventurers(commands);
    map.placeAdventurers(adventurers);

    this.simulationRunner.runAdventureLoop(map, adventurers);
    return this.simulationReport.getSimulationReport(map, adventurers);
  }
}
