import { Vehicle } from "@/app/features/vehicle/vehicle.types";

export interface VehicleCardProps extends Vehicle {
  isSelected: boolean;
}
