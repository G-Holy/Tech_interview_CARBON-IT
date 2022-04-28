import { Cell, ExplorableCell } from './types';
import {
  AdventurerCommand,
  Command,
  CommandFlag,
  MapCommand,
  MountainCommand,
  TreasureCommand,
} from './types/command-types';

export const isMapCommand = (command: Command): command is MapCommand =>
  command.type === CommandFlag.MAP;

export const isAdventurerCommand = (
  command: Command
): command is AdventurerCommand => command.type === CommandFlag.ADVENTURER;

export const isTreasureCommand = (
  command: Command
): command is TreasureCommand => command.type === CommandFlag.TREASURE;

export const isMountainCommand = (
  command: Command
): command is MountainCommand => command.type === CommandFlag.MOUNTAIN;

export const isExplorableCell = (cell: Cell): cell is ExplorableCell => {
  return 'isBeingExplored' in cell;
};
