import React, { SetStateAction } from "react";

export type HeaderRule = {
  label: string;
  description: string;
  require: boolean;
  regex?: RegExp;
};

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
  tableInfo: { content: string[]; label: string; errorRows: number[] }[];
}

export interface UploadStepperProps {
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  colData: string[][];
  headerRule: HeaderRule[];
  setColData: React.Dispatch<React.SetStateAction<string[][]>>;
  handleCreateVehicles: () => void;
  onClose: () => void;
}
