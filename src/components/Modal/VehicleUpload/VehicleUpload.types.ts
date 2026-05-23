import React, { SetStateAction } from "react";

export type VehicleHeaderKey =
  | "workTimeStart"
  | "workTimeEnd"
  | "breakTimeStart"
  | "breakTimeEnd"
  | "capacity"
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
  require?: boolean;
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
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  colData: string[][];
  vehicleFileHeader: VehicleFileHeader;
  setColData: React.Dispatch<React.SetStateAction<string[][]>>;
  handleCreateVehicles: () => void;
  setVehicleFileHeader: React.Dispatch<React.SetStateAction<VehicleFileHeader>>;
  onClose: () => void;
}
export interface VehicleUploadStateProps {
  state: number;
  file: File | undefined;
  colData: string[][];
  fileHeader: string[];
  vehicleFileHeader: VehicleFileHeader;
  ishasErrorFile: boolean;
  setState: React.Dispatch<React.SetStateAction<number>>;
  setVehicleFileHeader: React.Dispatch<React.SetStateAction<VehicleFileHeader>>;
  handleUploadFile: (file: File) => void;
}
