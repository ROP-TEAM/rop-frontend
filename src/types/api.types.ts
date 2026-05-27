export interface Location {
  lat: number;
  lng: number;
}

export interface TimePeriod {
  start: number;
  end: number;
}

export interface VehicleBase {
  model?: string;
  name: string;
  capacity: number;
  plateNumber?: string;
  profile_id?: number;
  workTimeStart: number;
  workTimeEnd: number;
  breakTimeStart?: number;
  breakTimeEnd?: number;

  maxTask?: number;
  skills?: { id?: number; name: string; color?: string }[];
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

export interface PreviewTableProps {
  colData: string[][];
  tableInfo: { fileCol: number; label: string; errorRows: number[] }[];
}

export interface CreateVehiclePayload {
  model?: string;
  name: string;
  maxCapacity: number;
  numberPlate?: string;

  workTime: TimePeriod;
  breakTime: TimePeriod;
  startLocation: Location;
  endLocation: Location;

  maxTask?: number;

  skills?: string[];
}
