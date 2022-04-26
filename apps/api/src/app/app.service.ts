import { Injectable } from '@nestjs/common';
import { AdventureParserService } from '@treasure-hunt/adventure-parser';

@Injectable()
export class AppService {
  constructor(private readonly AdventureParser: AdventureParserService) {}

  async generateAdventure(AdventureFilePath: string) {
    return this.AdventureParser.parseAdventure(AdventureFilePath);
  }
}
