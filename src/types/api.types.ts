export interface Location {
  lat: number;
  lng: number;
}

export interface TimePeriod {
  start: number;
  end: number;
}

export interface TimePeriodNotRequire {
  start?: number;
}

export interface VehicleBase {
  model?: string;
  name: string;
  dailyBreakTimeStart: number | undefined;
  dailyBreakTimeEnd: number | undefined;
  maxCapacity: number;
  numberPlate?: string;
  dailyWorkTimeStart: number;
  dailyWorkTimeEnd: number;
  startLocationLat: number;
  startLocationLng: number;
  endLocationLat: number;
  endLocationLng: number;
  maxTask?: number;
  skills?: string[];
}

export interface Order {
  id: number;
  name: string;
  description?: string;
  capacity: number;
  skils?: string[];
  timeWindow: TimePeriod;
  location: Location;
  serviceTime: number;
  type: "pick up" | "delivery";
  priority: "critical" | "high" | "medium" | "low";
}

export interface Vehicle extends VehicleBase {
  id: number;
}

interface VehicleRun extends Vehicle {
  totalDistance: number;
  travelTime: TimePeriod;
  currentCapacity: number;
  oderRuns: OrderRun[];
}

interface OrderRun extends Order {
  sequence: number;
  distance: number;
  arrivalTime: Date;
}

export interface Runs {
  id: number;
  totalRunsDistance: number;
  totalRunsTime: number;
  vehicleRuns: VehicleRun[];
}
