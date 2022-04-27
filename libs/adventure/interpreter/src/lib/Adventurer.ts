import {
  AdventurerMovement,
  Geolocation,
} from '@treasure-hunt/adventure/types';

export class Adventurer {
  private treasureCount = 0;
  constructor(
    readonly name: string,
    private readonly geoLocation: Geolocation,
    private readonly movements: AdventurerMovement[]
  ) {}
  getNextPosition() {}

  get geolocation(): Geolocation {
    return this.geoLocation;
  }
}
