import { deepCopyObject } from '../helpers';
import {
  Cell,
  CellType,
  FieldCell,
  GeoCoordinate,
  MapContent,
  MountainCell,
  TreasureCell,
} from '../types';
import { MapSize } from './Map';

export class MapBuilder {
  protected map: MapContent = [];
  protected treasures: TreasureCell[] = [];
  protected mountains: MountainCell[] = [];

  constructor(protected readonly size: MapSize) {
    this.createMap();
  }

  private createMap() {
    for (let longitude = 0; longitude < this.size.height; longitude++) {
      const mapLine = new Array(this.size.length)
        .fill({})
        .map((latitude) => this.createFieldCell({ x: latitude, y: longitude }));
      this.map.push(mapLine);
    }
  }

  public get mapCopy() {
    return deepCopyObject(this.map);
  }

  public get mountainsCopy() {
    return deepCopyObject(this.mountains);
  }

  public get treasuresCopy() {
    return deepCopyObject(this.treasures);
  }

  public get sizeCopy() {
    return deepCopyObject(this.size);
  }

  private createFieldCell(position: GeoCoordinate): FieldCell {
    return { type: CellType.FIELD, position, isBeingExplored: false };
  }

  protected createMountainCell(position: GeoCoordinate): MountainCell {
    return {
      type: CellType.MOUNTAIN,
      position,
      explorable: false,
    };
  }

  protected createTreasureCell(
    position: GeoCoordinate,
    count = 0
  ): TreasureCell {
    return {
      type: CellType.TREASURE,
      position,
      count,
      isBeingExplored: false,
    };
  }

  protected getCell(position: GeoCoordinate) {
    return this.map[position.y][position.x];
  }

  protected setCell(position: GeoCoordinate, cell: Cell) {
    this.map[position.y][position.x] = cell;
  }
}
