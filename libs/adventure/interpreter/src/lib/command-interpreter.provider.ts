import { HttpException } from '@nestjs/common';
import {
  Command,
  isAdventurerCommand,
  isMapCommand,
  isMountainCommand,
  isTreasureCommand,
  Adventurer,
  MountainCell,
  TreasureCell,
  createMountainCell,
  createTreasureCell,
  MapConfiguration,
} from '@treasure-hunt/adventure/core';

export class CommandInterpreterProvider {
  public getMapConfiguration(commands: Command[]): MapConfiguration {
    if (!this.isAdventureValid(commands)) {
      throw new HttpException('Wrong entry file', 400);
    }

    const size = this.getMapSize(commands);
    const mountains = this.getMountainCells(commands);
    const treasures = this.getTreasureCells(commands);
    return { size, mountains, treasures };
  }

  private isAdventureValid(commands: Command[]) {
    const oneMapCommand = commands.filter(isMapCommand).length === 1;
    return [oneMapCommand].every((isRuleValid) => isRuleValid);
  }

  private getMapSize(commands: Command[]) {
    const mapCommand = commands.find(isMapCommand);

    if (mapCommand === undefined) {
      throw new HttpException('Missing map configuration', 400);
    }
    return mapCommand.size;
  }

  private getMountainCells(commands: Command[]) {
    const mountainCommand = this.getMountainCommands(commands);

    return mountainCommand.reduce((mountainCells, mountainCommand) => {
      const { position } = mountainCommand;
      const mountain = createMountainCell(position);
      mountainCells.push(mountain);
      return mountainCells;
    }, [] as MountainCell[]);
  }

  private getTreasureCells(commands: Command[]) {
    const treasureCommands = this.getTreasureCommands(commands);

    return treasureCommands.reduce((treasureCells, treasureCommand) => {
      const { position, count } = treasureCommand;
      const treasure = createTreasureCell(position, count);
      treasureCells.push(treasure);
      return treasureCells;
    }, [] as TreasureCell[]);
  }

  public getAdventurers(commands: Command[]) {
    const adventurers: Adventurer[] = [];
    const adventurerCommands = this.getAdventurersCommand(commands);

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

  private getAdventurersCommand(commands: Command[]) {
    return commands.filter(isAdventurerCommand);
  }

  private getTreasureCommands(commands: Command[]) {
    return commands.filter(isTreasureCommand);
  }

  private getMountainCommands(commands: Command[]) {
    return commands.filter(isMountainCommand);
  }
}
