import { deepCopyObject, createFieldCell } from '../helpers';
import {
  Cell,
  GeoCoordinate,
  MapConfiguration,
  MapContent,
  MountainCell,
  TreasureCell,
} from '../types';
import { MapSize } from './Map';

export class MapBuilder {
  protected map: MapContent = [];
  protected treasures: TreasureCell[] = [];
  protected mountains: MountainCell[] = [];
  protected size: MapSize = { length: 0, height: 0 };

  constructor(configuration: MapConfiguration) {
    const { size, mountains, treasures } = configuration;
    this.buildMap(size);
    this.setCells(mountains);
    this.setCells(treasures);

    this.size = size;
    this.treasures = treasures;
    this.mountains = mountains;
  }

  private buildMap(size: MapSize) {
    for (let longitude = 0; longitude < size.height; longitude++) {
      const mapLine = new Array(size.length)
        .fill({})
        .map((latitude) => createFieldCell({ x: latitude, y: longitude }));
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

  protected getCell(position: GeoCoordinate) {
    return this.map[position.y][position.x];
  }

  protected setCell(position: GeoCoordinate, cell: Cell) {
    this.map[position.y][position.x] = cell;
  }

  private setCells(cells: Cell[]) {
    cells.forEach((cell) => this.setCell(cell.position, cell));
  }
}
