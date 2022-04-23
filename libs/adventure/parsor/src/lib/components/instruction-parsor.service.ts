import { Injectable } from '@nestjs/common';
import { InstructionFactoryProvider } from './instruction-factory.provider';

@Injectable()
export class InstructionParsorService {
  constructor(
    private readonly instructionFactory: InstructionFactoryProvider
  ) {}

  parseFileContent(rawInstructions: string[]) {
    const commands = rawInstructions.reduce((rawInstruction) => {
      // TODO: instaciate new instruction with factory & save it
      void rawInstruction;
      return [];
    }, []);
    return commands;
  }

  private;
}
