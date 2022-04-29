import { HttpException, Injectable, Scope } from '@nestjs/common';
import { CommandInterpreter } from './command-interpreter.provider';
import { Map, Command, Adventurer } from '@treasure-hunt/adventure/core';

@Injectable({ scope: Scope.REQUEST })
export class AdventureInterpreter {
  public interpretAdventure(commands: Command[]) {
    const commandInterpreter = new CommandInterpreter(commands);

    if (!commandInterpreter.isAdventureValid()) {
      throw new HttpException('Sorry this adventure is a lost cause...', 400);
    }

    const map = commandInterpreter.map;
    const adventurers = commandInterpreter.adventurers;
    map.adventurers = adventurers;

    // !Debug
    console.log('init map : ', map.mapCopy);
    console.log('init adventurers: ', JSON.stringify(adventurers));

    this.runAdventureLoop(map, adventurers);

    // !Debug
    console.log('\n\nEND map : ', map.mapCopy);
    console.log('END adventurers: ', JSON.stringify(adventurers));

    return undefined;
  }

  private runAdventureLoop(map: Map, adventurers: Adventurer[]) {
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
