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
  WorkTimeStart: number;
  WorkTimeEnd: number;
  startLatitude: number;
  startLongitude: number;
  endLatitude: number;
  endLongitude: number;

  maxTask?: number;
  skills?: string[];
}
export interface OrderBase {
  name: string;
  description?: string;
  capacity: number;
  skills?: string[];
  timeWindowStart: number;
  timeWindowEnd: number;
  deslatitude: number;
  deslongitude: number;
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
