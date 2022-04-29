import { HttpException, Injectable, Scope } from '@nestjs/common';
import { CommandInterpreter } from './command-interpreter.provider';
import { Command } from '@treasure-hunt/adventure/core';
import { AdventureRunnerProvider } from './adventure-runner.provider';
import { ReportFormatterProvider } from './report-formatter.provider';

@Injectable({ scope: Scope.REQUEST })
export class AdventureInterpreter {
  constructor(
    private readonly adventureRunner: AdventureRunnerProvider,
    private readonly reportFormatter: ReportFormatterProvider
  ) {}

  public interpreteSimulation(commands: Command[]) {
    const commandInterpreter = new CommandInterpreter(commands);
    if (!commandInterpreter.isAdventureValid()) {
      throw new HttpException('Sorry this adventure is a lost cause...', 400);
    }

    const map = commandInterpreter.map;
    const adventurers = commandInterpreter.adventurers;
    map.adventurers = adventurers;

    // !Debug
    console.log('init map : ', map.mapCopy);
    console.log('init adventurers: ', JSON.stringify(adventurers));

    this.adventureRunner.runAdventureLoop(map, adventurers);

    // !Debug
    console.log('\n\nEND map : ', map.mapCopy);
    console.log('END adventurers: ', JSON.stringify(adventurers));

    const simulationReport = this.reportFormatter.getSimulationReport(
      map,
      adventurers
    );

    // !Debug
    console.log('🚀 ~ interpreteSimulation ~ RESULT : \n', simulationReport);

    return simulationReport;
  }
}
