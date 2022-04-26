import { Injectable } from '@nestjs/common';
import { CommandTokens } from '@treasure-hunt/adventure/types';

@Injectable()
export class CommandLexorProvider {
  constructor() {}

  getTokens(line: string): CommandTokens {
    const sanitizedLine = this.sanitizeLine(line);
    return sanitizedLine.split(' ');
  }

  private removeNonAlphaNumCharacters(line: string) {
    return line.replace(/[^\w\s]/gi, '');
  }

  private sanitizeLine(line: string) {
    let sanitizedLine = this.removeNonAlphaNumCharacters(line);
    sanitizedLine = this.trimExtraSpace(sanitizedLine);
    return sanitizedLine;
  }

  private trimExtraSpace(line: string) {
    return line.replace(/\s+/g, ' ').trim();
  }
}
