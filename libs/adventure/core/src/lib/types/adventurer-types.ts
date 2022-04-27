import { Localizable } from './adventure-types';

export interface Geolocation extends Localizable {
  direction: CardinalDirection;
}

export enum AdventurerMovement {
  FORWARD = 'A',
  LEFT = 'G',
  RIGHT = 'D',
}

export enum CardinalDirection {
  NORTH = 'N',
  EAST = 'E',
  SOUTH = 'S',
  WEST = 'O',
}

export const CARDINAL_DIRECTION_COMPASS = [
  CardinalDirection.NORTH,
  CardinalDirection.EAST,
  CardinalDirection.SOUTH,
  CardinalDirection.WEST,
];
