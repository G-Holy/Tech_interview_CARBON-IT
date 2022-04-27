export type FileContent = string[];

export type GeoCoordinate = Localizable;
export interface Localizable {
  x: number;
  y: number;
}

export interface Enumerable {
  count: number;
}
