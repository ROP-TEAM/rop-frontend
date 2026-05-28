import { DropReason, Order, OrderBase } from "../order/order.types";
import { Vehicle, VehicleBase } from "../vehicle/vehicle.types";

interface Stop extends Order {
  arrivalMin: number;
  distanceFromPrevious: number;
  DurationFromPrevious: number;
}

interface Route extends Vehicle {
  totalDuration: number;
  totalDistance: number;
  stops: Stop[];
}
export interface OptimizeReqPayload {
  depotLat: number;
  depotLon: number;
  vehicles: VehicleBase[];
  orders: OrderBase[];
  enableAlns?: boolean;
  enableMultiTrip?: boolean;
  reloadMin?: number;
  seed?: number;
  timeLimitMS?: number;
}

export interface OptimizeResPayload {
  routes: Route[];
  dropReasons: DropReason[];
  message: string;
}
