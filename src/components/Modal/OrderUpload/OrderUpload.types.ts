import React, { SetStateAction } from "react";

export type OrderHeaderKey =
  | "name"
  | "description"
  | "capacity"
  | "skills"
  | "timeWindowStart"
  | "timeWindowEnd"
  | "location"
  | "serviceTime"
  | "type"
  | "priority";

export type OrderFileHeader = Record<
  OrderHeaderKey,
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
  orderFileHeader: OrderFileHeader;
  setOrderFileHeader: React.Dispatch<React.SetStateAction<OrderFileHeader>>;
  onClose: () => void;
}
