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

    // validate command program with rules (one map command)
    if (!this.commandInterpreter.isAdventureValid()) {
      throw new HttpException('Sorry this adventure is a lost cause...', 400);
    }
    const map = this.commandInterpreter.map;
    const adventurers = this.commandInterpreter.adventurers;

    console.log(
      '🚀 ~ file: ======== ~ adventurers',
      JSON.stringify(adventurers)
    );
    console.log('🚀 MAP === ', JSON.stringify(map));

    this.runAdventure(map, adventurers);

    return undefined;
  }

  private runAdventure(map: Map, adventurers: Adventurer[]) {}
}
