export type VehicleHeaderKey =
  | "workTimeStart"
  | "workTimeEnd"
  | "capacity"
  | "startLocation"
  | "endLocation"
  | "maxTask"
  | "skills"
  | "model"
  | "name"
  | "numberPlate";
export type VehicleFileHeader = Record<VehicleHeaderKey, number>;
