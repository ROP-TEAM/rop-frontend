import { TimePeriod } from "@/types/api.types";
export interface VehicleCardProps {
  id: number;
  name: string;
  capacity: number;
  numberPlate: string;
  workTime: TimePeriod;
}
