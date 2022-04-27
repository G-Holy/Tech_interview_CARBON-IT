export enum CellType {
  MOUNTAIN,
  TREASURE,
  FIELD,
}

interface ExplorableCell {
  busy: boolean;
}
export interface Cell {
  type: CellType;
  visitable: boolean;
}

export interface MountainCell extends Cell {
  type: CellType.MOUNTAIN;
  visitable: false;
}

export interface TreasureCell extends Cell, ExplorableCell {
  type: CellType.TREASURE;
  treasureNumber: number;
}

export interface FieldCell extends Cell, ExplorableCell {
  type: CellType.FIELD;
}

export type MapContent = Cell[][];
