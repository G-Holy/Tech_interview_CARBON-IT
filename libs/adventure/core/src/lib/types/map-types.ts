import { Enumerable, GeoCoordinate } from './adventure-types';

export enum CellType {
  MOUNTAIN = 'mountain',
  TREASURE = 'treasure',
  FIELD = 'field',
}

export interface Cell {
  type: CellType;
  position: GeoCoordinate;
}

export interface ExplorableCell extends Cell {
  isBeingExplored: boolean;
}

export interface MountainCell extends Cell {
  type: CellType.MOUNTAIN;
  explorable: false;
}

export interface TreasureCell extends ExplorableCell, Enumerable {
  type: CellType.TREASURE;
}

export interface FieldCell extends ExplorableCell {
  type: CellType.FIELD;
}

export type MapContent = Cell[][];

export const isTreasureCell = (cell: Cell): cell is TreasureCell => {
  return cell.type === CellType.TREASURE;
};
