import { Injectable } from '@nestjs/common';
import { InstructionsToken } from '../types';

export const instructionIndex: Record<InstructionsToken, string> = {
  [InstructionsToken.MAP]: '',
  [InstructionsToken.MOUNTAIN]: '',
  [InstructionsToken.TREASURE]: '',
  [InstructionsToken.ADVENTURER]: '',
  [InstructionsToken.COMMENTS]: '',
};

@Injectable()
export class InstructionFactoryProvider {
  private index = instructionIndex;

  instanciate(token: InstructionsToken) {
    return this.index[token];
  }
}
