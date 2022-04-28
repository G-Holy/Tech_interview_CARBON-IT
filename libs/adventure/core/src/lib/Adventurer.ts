import { movementFactory } from './Movement';
import {
  AdventurerMovement,
  CardinalDirection,
  GeoCoordinate,
  Geolocation,
} from './types';

export class Adventurer {
  private treasures = 0;

  constructor(
    readonly name: string,
    private geoLocation: Geolocation,
    private readonly movements: AdventurerMovement[]
  ) {}

  public get geolocation(): Geolocation {
    return this.geoLocation;
  }

  public get position(): GeoCoordinate {
    return this.geoLocation.position;
  }

  public set position(newPosition: GeoCoordinate) {
    this.geoLocation.position = newPosition;
  }

  public get movementsLeft(): number {
    return this.movements.length;
  }

  public set direction(newDirection: CardinalDirection) {
    this.geoLocation.direction = newDirection;
  }

  public putTreasuresInBackpack(foundTreasures: number) {
    this.treasures += foundTreasures;
  }

  public move() {
    const movement = this.movements.shift();
    if (!movement) {
      return;
    }
  }

  public getNextGeolocation() {
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
