import { Injectable } from '@nestjs/common';
import {
  AdventurerCommand,
  Command,
  CommandFlag,
  isAdventurerCommand,
  isMapCommand,
  MapCommand,
} from '@treasure-hunt/adventure/types';
import { Map } from './Map';

@Injectable()
export class CommandInterpreterProvider {
  private commands: Command[];

  feedCommands(commands: Command[]) {
    this.commands = commands;
  }

  get map() {
    const { length, height } = this.getMapCommand();
    const map = new Map(length, height);

    return;
  }

  get adventurers() {
    const adventurerCommands = this.getAdventurersCommand();
    return undefined;
  }

  isAdventureValid() {
    const onlyOneMapCommand = this.commands.filter(isMapCommand).length <= 1;
    return onlyOneMapCommand;
  }

  private getMapCommand() {
    return this.commands.find(isMapCommand);
  }

  private getAdventurersCommand() {
    return this.commands.filter(isAdventurerCommand);
  }
}
