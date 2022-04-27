import { movementFactory } from './Movement';
import { AdventurerMovement, GeoCoordinate, Geolocation } from './types';

export class Adventurer {
  private treasureCount = 0;
  constructor(
    readonly name: string,
    private readonly geoLocation: Geolocation,
    private readonly movements: AdventurerMovement[]
  ) {}

  public get geolocation(): Geolocation {
    return this.geoLocation;
  }

  public get position(): GeoCoordinate {
    return this.geoLocation.position;
  }

  public get movementsLeft(): number {
    return this.movements.length;
  }

  move() {
    const movement = this.movements.shift();
    if (!movement) {
      return;
    }
  }

  getNextGeolocation() {
    const movementFlag = this.movements.shift();
    if (!movementFlag) {
      return this.geolocation;
    }

    const movement = movementFactory.createMovement(
      movementFlag,
      this.geoLocation
    );

    return movement.calculateNextGeolocation();
  }
}
