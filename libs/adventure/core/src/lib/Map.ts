import { HttpException } from '@nestjs/common';
import { Adventurer } from './Adventurer';
import { deepCopyObject, isExplorableCell } from './helpers';
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

// TODO: !!! découpler MapBuilder/Map
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
    for (let yAxis = 0; yAxis < this.height; yAxis++) {
      const mapLine = new Array(this.length)
        .fill({})
        .map(() => deepCopyObject(fielCell));

      this.map.push(mapLine);
    }
  }

  public get mapCopy() {
    const jsonMap = JSON.stringify(this.map);
    const deepCopyMap = JSON.parse(jsonMap);
    return deepCopyMap;
  }

  public addMountainAtPosition(position: GeoCoordinate) {
    const mountainCell = this.createMountainCell();
    this.setCell(position, deepCopyObject(mountainCell));
  }

  public addTreasuresAtPosition(position: GeoCoordinate, count: number) {
    const treasureCell = this.createTreasureCell(count);
    this.setCell(position, deepCopyObject(treasureCell));
  }

  public set adventurers(adventurers: Adventurer[]) {
    adventurers.forEach((adventurer) => {
      const position = adventurer.getPosition();
      if (!this.isPositionInMap(position)) {
        throw new HttpException(`Explorer ${adventurer.name} is lost...`, 400);
      }

      const startingCell = this.getCell(position);
      if (!isExplorableCell(startingCell)) {
        throw new HttpException(
          `Explorer ${adventurer.name} fell from a mountain cliff`,
          400
        );
      }

      if (startingCell.isBeingExplored) {
        throw new HttpException(
          `Explorer ${adventurer.name} can't start here the cell is taken`,
          400
        );
      }
      startingCell.isBeingExplored = true;
    });
  }

  public isCellExplorable(position: GeoCoordinate) {
    let cellIsExplorable = false;
    const cell = this.getCell(position);

    console.log(
      '🚀 ~ file: Map.ts ~  this.isPositionInMap(position)',
      this.isPositionInMap(position)
    );
    console.log(
      '🚀 ~ file: Map.ts ~  isExplorableCell(cell))',
      isExplorableCell(cell)
    );
    if (this.isPositionInMap(position) && isExplorableCell(cell)) {
      const cellIsEmpty = cell.isBeingExplored === false;
      console.log('🚀 ~ file: Map.ts ~ cellIsEmpty', cellIsEmpty);
      const cellTypeIsExplorable = cell.type !== CellType.MOUNTAIN;
      console.log(
        '🚀 ~ file: Map.ts ~ cellTypeIsExplorable',
        cellTypeIsExplorable
      );
      cellIsExplorable = cellIsEmpty && cellTypeIsExplorable;
    }
    return cellIsExplorable;
  }

  public exploreCell(fromPosition: GeoCoordinate, toPosition: GeoCoordinate) {
    this.setCellExplorationStatus(fromPosition, false);
    this.setCellExplorationStatus(toPosition, true);
  }

  private setCellExplorationStatus(position: GeoCoordinate, status: boolean) {
    const cell = this.getCell(position);
    if (isExplorableCell(cell)) {
      cell.isBeingExplored = status;
    }
  }

  public lootCellTreasures(position: GeoCoordinate) {
    let treasuresCount = 0;
    const cellToLoot = this.getCell(position);

    if (isTreasureCell(cellToLoot) && cellToLoot.count > 0) {
      cellToLoot.count--;
      treasuresCount++;
    }
    return treasuresCount;
  }

  private setCell(position: GeoCoordinate, cell: Cell) {
    this.map[position.y][position.x] = cell;
  }

  private getCell(position: GeoCoordinate) {
    return this.map[position.y][position.x];
  }

  private createFieldCell(): FieldCell {
    return { type: CellType.FIELD, isBeingExplored: false };
  }

  private createMountainCell(): MountainCell {
    return {
      type: CellType.MOUNTAIN,
      explorable: false,
    };
  }

  private createTreasureCell(count = 0): TreasureCell {
    return {
      type: CellType.TREASURE,
      count,
      isBeingExplored: false,
    };
  }

  public isPositionInMap(position: GeoCoordinate) {
    const xIsInMapRange = this.isIndexInRange(position.x, this.length);
    const yIsInMapRange = this.isIndexInRange(position.y, this.height);
    return xIsInMapRange && yIsInMapRange;
  }

  private isIndexInRange(index: number, range: number) {
    return index >= 0 && index < range;
  }
}
