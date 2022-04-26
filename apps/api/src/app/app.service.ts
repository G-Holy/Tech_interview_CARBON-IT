import { Injectable } from '@nestjs/common';
import { AdventureParsorService } from '@treasure-hunt/adventure/parsor';

@Injectable()
export class AppService {
  constructor(private readonly AdventureParsor: AdventureParsorService) {}

  async generateAdventure(AdventureFilePath: string) {
    return this.AdventureParsor.parseAdventure(AdventureFilePath);
  }
}
