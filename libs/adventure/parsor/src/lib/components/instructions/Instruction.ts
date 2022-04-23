import { InstructionsToken } from '../../types';

export abstract class Instruction {
  token: InstructionsToken;
  instruction: any;

  constructor(rawInstruction: string) {
    const sanitzedInstruction =
      this.removeNonAlphaNumCharacters(rawInstruction);
    this.instruction = this.parse(sanitzedInstruction);
  }

  private removeNonAlphaNumCharacters(rawInstruction: string) {
    return rawInstruction.replace(/[^a-zA-Z0-9]/g, '');
  }

  abstract parse(sanitizedInstruction: string): {};
  abstract run(map: any);
}
