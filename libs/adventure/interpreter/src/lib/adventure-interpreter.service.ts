import { HttpException, Injectable, Scope } from '@nestjs/common';
import { Command, MapCommand } from '@treasure-hunt/adventure/types';
import { CommandInterpreterProvider } from './command-interpreter.provider';
import { Map } from './Map';

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

    console.log('🚀 MAP === ', JSON.stringify(map));

    // apply mountain command
    // apply treasure commands
    // execute adventurers movements
    return undefined;
  }
}
