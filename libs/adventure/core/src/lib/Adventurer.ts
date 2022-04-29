import { deepCopyObject } from './helpers';
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

  public get movementsLeft(): number {
    return this.movements.length;
  }

  public getGeolocation(): Geolocation {
    return deepCopyObject(this.geoLocation);
  }

  public getPosition(): GeoCoordinate {
    return deepCopyObject(this.geoLocation.position);
  }

  public setPosition(newPosition: GeoCoordinate) {
    this.geoLocation.position = newPosition;
  }

  public setDirection(newDirection: CardinalDirection) {
    this.geoLocation.direction = newDirection;
  }

  public putTreasuresInBackpack(foundTreasures: number) {
    this.treasures += foundTreasures;
  }

  private get geoLocationCopy() {
    return deepCopyObject<Geolocation>(this.geoLocation);
  }

  public move() {
    const movement = this.movements.shift();
    if (!movement) {
      return;
    }
  }

  public getNextGeolocation() {
    const currentGeoLocation = this.geoLocationCopy;
    const movementFlag = this.movements.shift();
    if (!movementFlag) {
      return currentGeoLocation;
    }

    const movement = movementFactory.createMovement(
      movementFlag,
      currentGeoLocation
    );
    return movement.calculateNextGeolocation();
  }
}
