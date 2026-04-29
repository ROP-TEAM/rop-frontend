interface Location {
  lat: number;
  lng: number;
}

interface TimePeriod {
  start: Date;
  end: Date;
}

export interface Vehicle {
  id: number;
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

export interface Order {
  id: number;
  name: string;
  description?: string;
  capacity: number;
  skils?: string[];
  timeWindow: TimePeriod;
  startLocation: Location;
  endLocation: Location;
  serviceTime: number;
  type: "pick up" | "delivery";
  priority: "critical" | "high" | "medium" | "low";
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
  name: string;
  totalRunsDistance: number;
  totalRunsTime: number;
  vehicleRuns: VehicleRun[];
}
