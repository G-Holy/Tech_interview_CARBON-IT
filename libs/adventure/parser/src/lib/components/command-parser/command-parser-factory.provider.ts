import { Injectable } from '@nestjs/common';
import {
  AdventurerCommand,
  AdventurerMovement,
  CardinalDirection,
  CommandFlag,
  CommandTokens,
  MapCommand,
  MountainCommand,
  TreasureCommand,
} from '@treasure-hunt/adventure/types';

export const commandParserIndex = {
  [CommandFlag.MAP]: (tokens: CommandTokens): MapCommand => {
    return {
      type: CommandFlag.MAP,
      length: +tokens[0],
      height: +tokens[1],
    };
  },
  [CommandFlag.MOUNTAIN]: (tokens: CommandTokens): MountainCommand => {
    return {
      type: CommandFlag.MOUNTAIN,
      x: +tokens[0],
      y: +tokens[1],
    };
  },
  [CommandFlag.TREASURE]: (tokens: CommandTokens): TreasureCommand => {
    return {
      type: CommandFlag.TREASURE,
      x: +tokens[0],
      y: +tokens[1],
      number: +tokens[2],
    };
  },
  [CommandFlag.ADVENTURER]: (tokens: CommandTokens): AdventurerCommand => {
    return {
      type: CommandFlag.ADVENTURER,
      name: tokens[0],
      x: +tokens[1],
      y: +tokens[2],
      orientation: tokens[3] as CardinalDirection,
      movementSequence: tokens[4].split('') as AdventurerMovement[],
    };
  },
};

@Injectable()
export class CommandParserFactoryProvider {
  private commandParsers = commandParserIndex;

  getParser(flag: CommandFlag) {
    return this.commandParsers[flag];
  }
}
