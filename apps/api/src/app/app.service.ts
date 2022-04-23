import { Injectable } from '@nestjs/common';
import { AdventureParsorService } from 'libs/adventure/parsor/src/lib/adventure-parsor.service';

@Injectable()
export class AppService {
  constructor(private readonly AdventureParsor: AdventureParsorService) {}

  async generateAdventure(AdventureFilePath: string) {
    return this.AdventureParsor.parseAdventure(AdventureFilePath);
  }
}
