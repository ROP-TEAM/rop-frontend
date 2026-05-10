import { ReactNode } from "react";

export interface CardContainerProps {
  children: ReactNode;
  carName: string;
  currentCapacity?: number;
  maxCapacity?: number;
  totalDistance: number;
  totalTime: Date;
}
