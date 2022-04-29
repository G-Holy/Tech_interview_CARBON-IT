import {
  Cell,
  ExplorableCell,
  CellType,
  FieldCell,
  GeoCoordinate,
  MountainCell,
  TreasureCell,
  AdventurerCommand,
  Command,
  CommandFlag,
  MapCommand,
  MountainCommand,
  TreasureCommand,
} from './types';

export const isMapCommand = (command: Command): command is MapCommand =>
  command.type === CommandFlag.MAP;

export const isAdventurerCommand = (
  command: Command
): command is AdventurerCommand => command.type === CommandFlag.ADVENTURER;

export const isTreasureCommand = (
  command: Command
): command is TreasureCommand => command.type === CommandFlag.TREASURE;

export const isMountainCommand = (
  command: Command
): command is MountainCommand => command.type === CommandFlag.MOUNTAIN;

export const isExplorableCell = (cell: Cell): cell is ExplorableCell => {
  return 'isBeingExplored' in cell;
};

export const deepCopyObject = <ObjectType>(object: ObjectType): ObjectType => {
  const stringifiedObject = JSON.stringify(object);
  const objectCopy = JSON.parse(stringifiedObject);
  return objectCopy;
};

export const createFieldCell = (position: GeoCoordinate): FieldCell => {
  return { type: CellType.FIELD, position, isBeingExplored: false };
};

export const createMountainCell = (position: GeoCoordinate): MountainCell => {
  return {
    type: CellType.MOUNTAIN,
    position,
    explorable: false,
  };
};

export const createTreasureCell = (
  position: GeoCoordinate,
  count = 0
): TreasureCell => {
  return {
    type: CellType.TREASURE,
    position,
    count,
    isBeingExplored: false,
  };
};
