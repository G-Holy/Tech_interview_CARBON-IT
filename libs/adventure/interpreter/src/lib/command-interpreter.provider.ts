import { HttpException, Provider } from '@nestjs/common';
import {
  Command,
  isAdventurerCommand,
  isMapCommand,
  isMountainCommand,
  isTreasureCommand,
  Map,
  Adventurer,
} from '@treasure-hunt/adventure/core';

export class CommandInterpreter {
  constructor(private commands: Command[]) {}

  feedCommands(commands: Command[]) {
    this.commands = commands;
  }

  public get map() {
    const mapCommand = this.getMapCommand();

    if (mapCommand === undefined) {
      throw new HttpException('Missing map configuration', 400);
    }

    const { length, height } = mapCommand;
    const map = new Map({ length, height });
    this.executeTreasurepCommands(map);
    this.executeMountainCommands(map);
    return map;
  }

  private executeTreasurepCommands(map: Map) {
    const treasuresCommands = this.getTreasureCommands();
    treasuresCommands.forEach(({ position, count }) =>
      map.addTreasuresAtPosition(position, count)
    );
  }

  private executeMountainCommands(map: Map) {
    const mountainCommands = this.getMountainCommands();
    mountainCommands.forEach(({ position }) =>
      map.addMountainAtPosition(position)
    );
  }

  public get adventurers() {
    const adventurers: Adventurer[] = [];
    const adventurerCommands = this.getAdventurersCommand();

    adventurerCommands.forEach(
      ({ name, movementSequence, position, direction }) => {
        const newcommer = new Adventurer(
          name,
          { position, direction },
          movementSequence
        );
        adventurers.push(newcommer);
      }
    );
    return adventurers;
  }

  public isAdventureValid() {
    const onlyOneMapCommand = this.commands.filter(isMapCommand).length <= 1;
    return onlyOneMapCommand;
  }

  private getMapCommand() {
    return this.commands.find(isMapCommand);
  }

  private getAdventurersCommand() {
    return this.commands.filter(isAdventurerCommand);
  }

  private getTreasureCommands() {
    return this.commands.filter(isTreasureCommand);
  }

  private getMountainCommands() {
    return this.commands.filter(isMountainCommand);
  }
}

export const COMMAND_INTERPRETER_PROVIDER_KEY = Symbol(
  'CommandInterpreterProvider'
);

export const CommandInterpreterProvider: Provider = {
  provide: COMMAND_INTERPRETER_PROVIDER_KEY,
  useValue: CommandInterpreter,
};
