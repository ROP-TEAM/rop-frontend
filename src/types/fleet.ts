export interface FleetRoute {
  name: string;
  route: string[][];
}

export interface FleetData {
  data: FleetRoute[];
}

export interface ParsedVehicle {
  name: string;
  route: [number, number][];
  color: [number, number, number, number];
}
