import { HttpException, Injectable, Scope } from '@nestjs/common';
import { CommandInterpreterProvider } from './command-interpreter.provider';
import { Map, Command, Adventurer } from '@treasure-hunt/adventure/core';

@Injectable({ scope: Scope.REQUEST })
export class AdventureInterpreter {
  constructor(
    private readonly commandInterpreter: CommandInterpreterProvider
  ) {}

  public interpretAdventure(commands: Command[]) {
    this.commandInterpreter.feedCommands(commands);

    if (!this.commandInterpreter.isAdventureValid()) {
      throw new HttpException('Sorry this adventure is a lost cause...', 400);
    }

    const map = this.commandInterpreter.map;
    const adventurers = this.commandInterpreter.adventurers;
    map.adventurers = adventurers;

    console.log(
      '🚀 ~ file: ======== ~ adventurers',
      JSON.stringify(adventurers)
    );
    console.log('🚀 MAP === ', JSON.stringify(map));

    this.runAdventure(map, adventurers);
    return undefined;
  }

  private runAdventure(map: Map, adventurers: Adventurer[]) {
    const maxTurns = this.getMaxTurns(adventurers);

    for (let turn = 0; turn < maxTurns; turn++) {
      this.moveAdventurers(adventurers);
    }
  }

  private moveAdventurers(adventurers: Adventurer[]) {
    adventurers.forEach((adventurer) => {
      // const nextPositon = adventurer.getNextPosition()
    });
  }

  private getMaxTurns(adventurers: Adventurer[]) {
    const adventurersMovementsCount = adventurers.reduce(
      (turns, adventurer) => [...turns, adventurer.movementsLeft],
      []
    );
    return Math.max(...adventurersMovementsCount);
  }
}
