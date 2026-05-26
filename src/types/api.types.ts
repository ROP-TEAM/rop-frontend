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
  maxCapacity: number;
  numberPlate?: string;
  profile_id?: number;
  workTime: TimePeriod;
  breakTime: TimePeriod;
  startLocation: Location;
  endLocation: Location;
  maxTask?: number;
  skills?: {  id?: number; name: string; color: string }[];
}

export interface Order {
  id: number;
  name: string;
  description?: string;
  capacity: number;
  skills?: {
    id?: number;
    name: string;
    color: string;
  };
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
