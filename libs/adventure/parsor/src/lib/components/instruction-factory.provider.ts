import { Injectable } from '@nestjs/common';
import { InstructionsToken } from '../types';

interface Localizable {
  x: number;
  y: number;
}

enum CardinalOrientation {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

export const instructionIndex = {
  [InstructionsToken.MAP]: (tokens: string[]) => {
    return {
      type: InstructionsToken.MAP,
      lenght: +tokens[0],
      height: +tokens[1],
    };
  },
  [InstructionsToken.MOUNTAIN]: (tokens: string[]) => {
    return {
      type: InstructionsToken.MOUNTAIN,
      x: +tokens[0],
      y: +tokens[1],
    };
  },
  [InstructionsToken.TREASURE]: (tokens: string[]) => {
    return {
      type: InstructionsToken.TREASURE,
      x: +tokens[0],
      y: +tokens[1],
      number: +tokens[2],
    };
  },
  [InstructionsToken.ADVENTURER]: (tokens: string[]) => {
    return {
      type: InstructionsToken.ADVENTURER,
      name: tokens[0],
      x: +tokens[1],
      y: +tokens[2],
      orientation: tokens[3],
      movementSequence: tokens[4],
    };
  },
};

@Injectable()
export class InstructionFactoryProvider {
  private instructions = instructionIndex;

  getParsor(identifier: string) {
    return this.instructions[identifier];
  }
}
