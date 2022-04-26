import { Injectable } from '@nestjs/common';
import { CommandFlag, CommandTokens } from '@treasure-hunt/adventure/types';

export const commandParsorIndex = {
  [CommandFlag.MAP]: (tokens: CommandTokens) => {
    return {
      type: CommandFlag.MAP,
      lenght: +tokens[0],
      height: +tokens[1],
    };
  },
  [CommandFlag.MOUNTAIN]: (tokens: CommandTokens) => {
    return {
      type: CommandFlag.MOUNTAIN,
      x: +tokens[0],
      y: +tokens[1],
    };
  },
  [CommandFlag.TREASURE]: (tokens: CommandTokens) => {
    return {
      type: CommandFlag.TREASURE,
      x: +tokens[0],
      y: +tokens[1],
      number: +tokens[2],
    };
  },
  [CommandFlag.ADVENTURER]: (tokens: CommandTokens) => {
    return {
      type: CommandFlag.ADVENTURER,
      name: tokens[0],
      x: +tokens[1],
      y: +tokens[2],
      orientation: tokens[3],
      movementSequence: tokens[4],
    };
  },
};

@Injectable()
export class CommandParsorFactoryProvider {
  private commandParsors = commandParsorIndex;

  getParsor(flag: CommandFlag) {
    return this.commandParsors[flag];
  }
}
