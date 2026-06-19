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
  breakTimeStart: number | undefined;
  breakTimeEnd: number | undefined;
  capacity: number;
  plateNumber?: string;
  workTimeStart: number;
  workTimeEnd: number;
  maxTask?: number;
  skills?: { name: string }[];
}
export interface OrderBase {
  name: string;
  description?: string;
  capacity: number;
  skill?: string;
  timeWindowStart: number;
  timeWindowEnd: number;
  desLatitude: number;
  desLongitude: number;
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
