import {
  AdventurerMovement,
  CardinalDirection,
  CARDINAL_DIRECTION_COMPASS,
} from './types/adventurer-types';
import { Geolocation } from './types/adventurer-types';

abstract class Movement {
  constructor(protected readonly geolocation: Geolocation) {}

  public abstract calculateNextGeolocation(): Geolocation;

  protected shiftDirectionFromCompass(directionIndex: number) {
    const newDirection = CARDINAL_DIRECTION_COMPASS.at(directionIndex);
    if (newDirection === undefined) {
      throw new Error('Woops. The compass is broken');
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
    switch (this.geolocation.direction) {
      case CardinalDirection.NORTH:
        this.geolocation.position.y += 1;
        break;

      case CardinalDirection.EAST:
        this.geolocation.position.x += 1;
        break;

      case CardinalDirection.SOUTH:
        this.geolocation.position.y -= 1;
        break;
      case CardinalDirection.WEST:
        this.geolocation.position.y -= 1;
        break;

      default:
        break;
    }
    return this.geolocation;
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
