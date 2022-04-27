import {
  CellType,
  FieldCell,
  MapContent,
  MountainCell,
} from '@treasure-hunt/adventure/types';

export class Map {
  map: MapContent = [];

  constructor(length: number, height: number) {
    this.createMap(length, height);
  }

  private createMap(length: number, height: number) {
    const fielCell: FieldCell = this.createFieldCell();
    const defaultMapLine = Array(length).fill(fielCell);
    for (let i = 0; i < height; i++) {
      this.map.push(defaultMapLine);
    }
  }

  addMountain(x: number, y: number) {
    const mountainCell = this.createMountainCell();
    this.map[x][y] = mountainCell;
  }

  private createFieldCell(): FieldCell {
    return { type: CellType.FIELD, visitable: true, busy: false };
  }

  private createMountainCell(): MountainCell {
    return { type: CellType.MOUNTAIN, visitable: false };
  }
}
