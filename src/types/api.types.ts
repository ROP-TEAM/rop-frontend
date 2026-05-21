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
export interface OrderBase {
  name: string;
  description?: string;
  capacity: number;
  skils?: string[];
  timeWindowStart: number;
  timeWindowEnd: number;
  locationLat: number;
  locationLng: number;
  serviceTime: number;
  type: number;
  priority: number;
}

export interface Order extends OrderBase {
  id: number;
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
