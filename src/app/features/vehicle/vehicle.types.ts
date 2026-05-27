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
export interface Vehicle extends VehicleBase {
  id: number;
}
