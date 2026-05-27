export interface OrderBase {
  orderName: string;
  note?: string;
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

export interface Stop extends Order {
  arrivalMin: number;
  serviceTime: number;
  distanceFromPrevious: number;
  timeFromPrevious: number;
}
export interface DropReason extends Stop {
  detail: string;
  code: string;
}
