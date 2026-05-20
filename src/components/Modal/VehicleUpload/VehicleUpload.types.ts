import React, { SetStateAction } from "react";

export type VehicleHeaderKey =
  | "workTimeStart"
  | "workTimeEnd"
  | "breakTimeStart"
  | "breakTimeEnd"
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
    errorRows: number[];
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
  errorRows: number[];
  onValid: (rows: number[]) => void;
}

export interface PreviewTableProps {
  colData: string[][];
  tableInfo: { fileCol: number; label: string; errorRows: number[] }[];
}

export interface UploadStepperProps {
  colData: string[][];
  vehicleFileHeader: VehicleFileHeader;
  setColData: React.Dispatch<React.SetStateAction<string[][]>>;
  handleCreateVehicles: () => void;
  setVehicleFileHeader: React.Dispatch<React.SetStateAction<VehicleFileHeader>>;
  onClose: () => void;
}
