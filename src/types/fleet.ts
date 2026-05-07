// src/types/fleet.ts
export type Priority =
  | "Depot"
  | "Critical"
  | "High"
  | "Medium"
  | "Low"
  | "Heavy";

export interface RoutePoint {
  loc: string[];
  prio: Priority;
}

export interface Vehicle {
  name: string;
  route: RoutePoint[];
}

export interface FleetData {
  data: Vehicle[];
}

export interface ParsedLocation {
  lat: number;
  lng: number;
}
