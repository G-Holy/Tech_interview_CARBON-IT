import { HttpException } from '@nestjs/common';
import { Adventurer } from './Adventurer';
import { isExplorableCell } from '../helpers';
import {
  CellType,
  GeoCoordinate,
  isTreasureCell,
  MapConfiguration,
} from '../types';
import { MapBuilder } from './MapBuilder';

export interface MapSize {
  length: number;
  height: number;
}

export class Map extends MapBuilder {
  constructor(configuration: MapConfiguration) {
    super(configuration);
  }

  public placeAdventurers(adventurers: Adventurer[]) {
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
  private setCellExplorationStatus(position: GeoCoordinate, status: boolean) {
    const cell = this.getCell(position);
    if (isExplorableCell(cell)) {
      cell.isBeingExplored = status;
    }
  }

  public isCellExplorable(position: GeoCoordinate) {
    let cellIsExplorable = false;
    const cell = this.getCell(position);

    if (this.isPositionInMap(position) && isExplorableCell(cell)) {
      const cellIsEmpty = cell.isBeingExplored === false;
      const cellTypeIsExplorable = cell.type !== CellType.MOUNTAIN;
      cellIsExplorable = cellIsEmpty && cellTypeIsExplorable;
    }
    return cellIsExplorable;
  }

  public exploreCell(fromPosition: GeoCoordinate, toPosition: GeoCoordinate) {
    this.setCellExplorationStatus(fromPosition, false);
    this.setCellExplorationStatus(toPosition, true);
  }

  public lootCellTreasures(position: GeoCoordinate) {
    let treasuresCount = 0;
    const cellToLoot = this.getCell(position);

    if (isTreasureCell(cellToLoot) && cellToLoot.count > 0) {
      cellToLoot.count = cellToLoot.count - 1;
      treasuresCount++;
    }
    return treasuresCount;
  }

  public isPositionInMap(position: GeoCoordinate) {
    const xIsInMapRange = this.isIndexInAxisRange(position.x, this.size.length);
    const yIsInMapRange = this.isIndexInAxisRange(position.y, this.size.height);
    return xIsInMapRange && yIsInMapRange;
  }

  private isIndexInAxisRange(index: number, range: number) {
    return index >= 0 && index < range;
  }
}
