import { CardinalDirection } from './adventurer-types';
import { CommandFlag } from './command-types';

export type ReportData = number | string;

export type AdventurerReport = [
  CommandFlag.ADVENTURER,
  Name,
  Latitude,
  Longitude,
  CardinalDirection,
  TreasureCount
];

export type MapReport = [CommandFlag.MAP, Length, Height];
export type MountainReport = [CommandFlag.MOUNTAIN, Latitude, Longitude];
export type TreasuresReport = [
  CommandFlag.TREASURE,
  Latitude,
  Longitude,
  TreasureCount
];

export type Report =
  | AdventurerReport
  | MapReport
  | MountainReport
  | TreasuresReport;

export type ReportFileContent = string;

export const DATA_SEPARATOR = ' - ';

type Length = number;
type Height = number;
type Name = string;
type Latitude = number;
type Longitude = number;
type TreasureCount = number;
