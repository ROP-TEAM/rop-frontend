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
export type VehicleFileHeader = Record<
  VehicleHeaderKey,
  {
    fileCol: number;
    ErrorRows: number[];
    label: string;
    description: string;
    value: string;
    require: boolean;
    regex?: RegExp;
  }
>;

export interface ErrorTableProps {
  systemHeader: string;
  data: string[];
  description: string;
  regex?: RegExp;
}
