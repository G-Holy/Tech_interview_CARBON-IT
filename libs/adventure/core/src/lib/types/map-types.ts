import { Adventurer } from '../Adventurer';
import { Enumerable } from './adventure-types';

export enum CellType {
  MOUNTAIN = 'mountain',
  TREASURE = 'treasure',
  FIELD = 'field',
}

export interface Cell {
  type: CellType;
  explorable: boolean;
  adventurer: Adventurer | undefined;
}

export interface MountainCell extends Cell {
  type: CellType.MOUNTAIN;
  explorable: false;
}

export interface TreasureCell extends Cell, Enumerable {
  type: CellType.TREASURE;
}

export interface FieldCell extends Cell {
  type: CellType.FIELD;
}

export type MapContent = Cell[][];

export const isTreasureCell = (cell: Cell): cell is TreasureCell => {
  return cell.type === CellType.TREASURE;
};
