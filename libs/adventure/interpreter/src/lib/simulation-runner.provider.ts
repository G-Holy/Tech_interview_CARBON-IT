import { Injectable } from '@nestjs/common';
import { Adventurer, Map } from '@treasure-hunt/adventure/core';

@Injectable()
export class SimulationRunnerProvider {
  runAdventureLoop(map: Map, adventurers: Adventurer[]) {
    const maxTurnsCount = this.getMaxTurns(adventurers);

    for (let turn = 0; turn < maxTurnsCount; turn++) {
      this.runAdventurersTurn(adventurers, map);
    }
  }

  private getMaxTurns(adventurers: Adventurer[]) {
    const adventurersMovementsCount = adventurers.reduce(
      (turns, adventurer) => [...turns, adventurer.movementsLeft],
      [] as number[]
    );
    return Math.max(...adventurersMovementsCount);
  }

  private runAdventurersTurn(adventurers: Adventurer[], map: Map) {
    adventurers.forEach((adventurer) => {
      const { position: positionIntent, direction } =
        adventurer.getNextGeolocation();

      adventurer.setDirection(direction);

      if (map.isCellExplorable(positionIntent)) {
        const { position: currentPosition } = adventurer.getGeolocation();

        map.exploreCell(currentPosition, positionIntent);
        adventurer.setPosition(positionIntent);

        const treasuresLootedCount = map.lootCellTreasures(positionIntent);
        adventurer.putTreasuresInBackpack(treasuresLootedCount);
      }
    });
  }
}
