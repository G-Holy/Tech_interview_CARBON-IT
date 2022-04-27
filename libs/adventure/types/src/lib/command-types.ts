import { Enumerable, Localizable } from './adventure-types';
import { AdventurerMovement, CardinalDirection } from './adventurer-types';

export enum CommandFlag {
  MAP = 'C',
  MOUNTAIN = 'M',
  TREASURE = 'T',
  ADVENTURER = 'A',
}
export type CommandTokens = string[];

export interface Command {
  type: CommandFlag;
}

export interface MapCommand extends Command {
  type: CommandFlag.MAP;
  length: number;
  height: number;
}

export interface MountainCommand extends Command, Localizable {
  type: CommandFlag.MOUNTAIN;
}

export interface TreasureCommand extends Command, Localizable, Enumerable {
  type: CommandFlag.TREASURE;
}

export interface AdventurerCommand extends Command, Localizable {
  type: CommandFlag.ADVENTURER;
  name: string;
  orientation: CardinalDirection;
  movementSequence: AdventurerMovement[];
}

export function isCommandFlag(value: string): value is CommandFlag {
  return Object.values(CommandFlag).includes(value as CommandFlag);
}
