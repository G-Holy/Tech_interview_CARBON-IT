import { Injectable } from '@nestjs/common';
import { CommandTokens } from '@treasure-hunt/adventure/core';

@Injectable()
export class CommandLexerProvider {
  getTokens(line: string): CommandTokens {
    const sanitizedLine = this.sanitizeLine(line);
    return sanitizedLine.split(' ');
  }

  private removeNonAlphaNumCharacters(line: string) {
    return line.replace(/[^\w\s]/gi, '');
  }

  private sanitizeLine(line: string) {
    const lineWithoutNonAlphaNum = this.removeNonAlphaNumCharacters(line);
    const lineWithoutExtraSpaece = this.trimExtraSpace(lineWithoutNonAlphaNum);
    return lineWithoutExtraSpaece;
  }

  private trimExtraSpace(line: string) {
    return line.replace(/\s+/g, ' ').trim();
  }
}
