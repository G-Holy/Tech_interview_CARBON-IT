import { Injectable } from '@nestjs/common';
import { Adventurer, Map } from '@treasure-hunt/adventure/core';

@Injectable()
export class SimulationRunnerProvider {
  runAdventureLoop(map: Map, adventurers: Adventurer[]) {
    const maxTurnsCount = this.getMaxTurns(adventurers);

    for (let turn = 0; turn < maxTurnsCount; turn++) {
      console.log('turn : ', turn);

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
      // !Debug
      console.log('\n');
      console.log(`BEFORE-TURN adventurer `, JSON.stringify(adventurer));

      const { position: positionIntent, direction } =
        adventurer.getNextGeolocation();

      // !Debug
      console.log('CURRENT geoloc : ', adventurer.getGeolocation());
      console.log('NEXT geoloc : ', positionIntent);

      adventurer.setDirection(direction);

      // !Debug
      console.log('DIRECTION after switch ', direction);
      console.log(
        '🚀 ~ IS NEXT CELL EXPLORABLE (maybe current)',
        map.isCellExplorable(positionIntent)
      );
      if (map.isCellExplorable(positionIntent)) {
        const { position: currentPosition } = adventurer.getGeolocation();

        map.exploreCell(currentPosition, positionIntent);
        adventurer.setPosition(positionIntent);

        const treasuresLootedCount = map.lootCellTreasures(positionIntent);
        adventurer.putTreasuresInBackpack(treasuresLootedCount);
      }

      // !Debug
      console.log(`AFTER-MAP `, map.mapCopy);
      console.log(`AFTER-TURN adventurer `, JSON.stringify(adventurer));
    });
  }
}
