import { Injectable } from '@nestjs/common';
import {
  Command,
  isAdventurerCommand,
  isMapCommand,
  isMountainCommand,
  isTreasureCommand,
  Map,
  Adventurer,
} from '@treasure-hunt/adventure/core';

@Injectable()
export class CommandInterpreterProvider {
  private commands: Command[];

  feedCommands(commands: Command[]) {
    this.commands = commands;
  }

  public get map() {
    const { length, height } = this.getMapCommand();
    const map = new Map(length, height);

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
