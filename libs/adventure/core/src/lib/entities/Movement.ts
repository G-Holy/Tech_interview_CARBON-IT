import {
  AdventurerMovement,
  CardinalDirection,
  CARDINAL_DIRECTION_COMPASS,
} from '../types/adventurer-types';
import { Geolocation } from '../types/adventurer-types';

abstract class Movement {
  constructor(protected readonly geolocation: Geolocation) {}

  public abstract calculateNextGeolocation(): Geolocation;

  protected shiftDirectionFromCompass(newDirectionIndex: number) {
    const directionTypeCount = CARDINAL_DIRECTION_COMPASS.length;
    const newDirection =
      CARDINAL_DIRECTION_COMPASS[
        ((newDirectionIndex % directionTypeCount) + directionTypeCount) %
          directionTypeCount
      ];

    if (newDirection === undefined) {
      throw new Error('Woops. The compass is broken ====');
    }
    this.geolocation.direction = newDirection;
  }

  protected get directionIndex(): number {
    const directionIndex = CARDINAL_DIRECTION_COMPASS.indexOf(
      this.geolocation.direction
    );

    if (directionIndex === -1) {
      throw new Error('Woops. The compass is broken');
    }
    return directionIndex;
  }
}

class ForwardMovement extends Movement {
  constructor(geolocation: Geolocation) {
    super(geolocation);
  }

  calculateNextGeolocation(): Geolocation {
    const nextGeoLocation = this.geolocation;

    switch (this.geolocation.direction) {
      case CardinalDirection.NORTH:
        nextGeoLocation.position.y = nextGeoLocation.position.y - 1;
        break;

      case CardinalDirection.EAST:
        nextGeoLocation.position.x = nextGeoLocation.position.x + 1;
        break;

      case CardinalDirection.SOUTH:
        nextGeoLocation.position.y = nextGeoLocation.position.y + 1;
        break;
      case CardinalDirection.WEST:
        nextGeoLocation.position.x = nextGeoLocation.position.x - 1;
        break;

      default:
        break;
    }
    return nextGeoLocation;
  }
}

class LeftMovement extends Movement {
  constructor(geolocation: Geolocation) {
    super(geolocation);
  }

  calculateNextGeolocation(): Geolocation {
    this.shiftDirectionFromCompass(this.directionIndex - 1);
    return this.geolocation;
  }
}

class RightMovement extends Movement {
  constructor(geolocation: Geolocation) {
    super(geolocation);
  }

  calculateNextGeolocation(): Geolocation {
    this.shiftDirectionFromCompass(this.directionIndex + 1);
    return this.geolocation;
  }
}

interface MovementBuilder {
  new (geoLocation: Geolocation): Movement;
}

const movementIndex: Record<AdventurerMovement, MovementBuilder> = {
  [AdventurerMovement.FORWARD]: ForwardMovement,
  [AdventurerMovement.LEFT]: LeftMovement,
  [AdventurerMovement.RIGHT]: RightMovement,
};

export const movementFactory = {
  createMovement(type: AdventurerMovement, geoLocation: Geolocation) {
    return new movementIndex[type](geoLocation);
  },
};
