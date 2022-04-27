import { Injectable } from '@nestjs/common';
import {
  AdventurerCommand,
  Command,
  CommandFlag,
  isAdventurerCommand,
  isMapCommand,
  isMountainCommand,
  isTreasureCommand,
  MapCommand,
} from '@treasure-hunt/adventure/types';
import { Map } from './Map';

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
    treasuresCommands.forEach(({ x, y, count }) =>
      map.addTreasures({ x, y }, count)
    );
  }

  private executeMountainCommands(map: Map) {
    const mountainCommands = this.getMountainCommands();
    mountainCommands.forEach(({ x, y }) => map.addMountain({ x, y }));
  }

  public get adventurers() {
    const adventurerCommands = this.getAdventurersCommand();
    return undefined;
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
