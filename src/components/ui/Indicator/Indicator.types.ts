import { ReactNode } from "react";

export interface IndicatorProps {
  children: ReactNode;
  isActive: boolean;
  backgroundColor: string;
}
