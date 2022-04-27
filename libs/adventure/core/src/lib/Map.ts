import { HttpException } from '@nestjs/common';
import { Adventurer } from './Adventurer';
import {
  Cell,
  CellType,
  FieldCell,
  GeoCoordinate,
  isTreasureCell,
  MapContent,
  MountainCell,
  TreasureCell,
} from './types';

export class Map {
  private map: MapContent = [];

  constructor(
    private readonly length: number,
    private readonly height: number
  ) {
    this.createMap();
  }

  private createMap() {
    const fielCell: FieldCell = this.createFieldCell();
    for (let yLine = 0; yLine < this.height; yLine++) {
      const xLine = Array(this.length).fill(fielCell);
      this.map.push(xLine);
    }
  }

  public addMountain(position: GeoCoordinate) {
    const mountainCell = this.createMountainCell();
    this.setCell(position, mountainCell);
  }

  public addTreasures(position: GeoCoordinate, count: number) {
    const currentCell = this.getCell(position);

    if (!isTreasureCell(currentCell)) {
      const treasureCell = this.createTreasureCell();
      this.setCell(position, treasureCell);
    } else {
      currentCell.count += count;
      this.setCell(position, currentCell);
    }
  }

  public set adventurers(adventurers: Adventurer[]) {
    adventurers.forEach((adventurer) => {
      const position = adventurer.position;
      if (!this.isPositionInMap(position)) {
        throw new HttpException(`Explorer ${adventurer.name} is lost...`, 400);
      }

      const startingCell = this.getCell(position);
      if (startingCell.adventurer !== undefined) {
        throw new HttpException(
          `Explorer ${adventurer.name} can't start here. This position is too crowded`,
          400
        );
      }
      startingCell.adventurer = adventurer;
    });
  }

  public isCellExplorable(position: GeoCoordinate) {
    const targetCell = this.getCell(position);
    const cellIsEmpty = targetCell.adventurer === undefined;
    const cellIsExplorable = targetCell.type !== CellType.MOUNTAIN;

    return this.isPositionInMap(position) && cellIsEmpty && cellIsExplorable;
  }

  public moveAdventurer(adventurer: Adventurer) {
    const { position, direction } = adventurer.getNextGeolocation();
    // TODO: checker que ce soit la bonne geoloc
    // TODO: bouger l'adventurer si tout est ok
  }

  private setCell(position: GeoCoordinate, cell: Cell) {
    this.map[position.y][position.x] = cell;
  }

  private getCell(position: GeoCoordinate) {
    return this.map[position.y][position.x];
  }

  private createFieldCell(): FieldCell {
    return { type: CellType.FIELD, explorable: true, adventurer: undefined };
  }

  private createMountainCell(): MountainCell {
    return {
      type: CellType.MOUNTAIN,
      explorable: false,
      adventurer: undefined,
    };
  }

  private createTreasureCell(): TreasureCell {
    return {
      type: CellType.TREASURE,
      count: 0,
      explorable: true,
      adventurer: undefined,
    };
  }

  public isPositionInMap(position: GeoCoordinate) {
    const { x, y } = position;
    return (
      this.isIndexInRange(x, this.length) && this.isIndexInRange(y, this.height)
    );
  }

  private isIndexInRange(index: number, range: number) {
    return index > 0 && index < range;
  }
}
