export type FileContent = string[];

export interface Localizable {
  x: number;
  y: number;
}

export enum CardinalOrientation {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

export enum CommandFlag {
  MAP = 'C',
  MOUNTAIN = 'M',
  TREASURE = 'T',
  ADVENTURER = 'A',
}

export type CommandTokens = string[];

export function isCommandFlag(value: string): value is CommandFlag {
  return Object.values(CommandFlag).includes(value as CommandFlag);
}
