export type FileContent = string[];

export type GeoCoordinate = { x: number; y: number };

export interface Localizable {
  position: GeoCoordinate;
}

export interface Enumerable {
  count: number;
}
