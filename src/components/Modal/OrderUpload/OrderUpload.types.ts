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

export interface OrderUploadProps {
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  colData: string[][];
  orderFileHeader: OrderFileHeader;
  setColData: React.Dispatch<React.SetStateAction<string[][]>>;
  setOrderFileHeader: React.Dispatch<React.SetStateAction<OrderFileHeader>>;
  handleCreateOrder: () => void;
  onClose: () => void;
}
export interface OrderUploadStateProps {
  state: number;
  file: File | undefined;
  colData: string[][];
  fileHeader: string[];
  orderFileHeader: OrderFileHeader;
  ishasErrorFile: boolean;
  setState: React.Dispatch<React.SetStateAction<number>>;
  setOrderFileHeader: React.Dispatch<React.SetStateAction<OrderFileHeader>>;
  handleUploadFile: (file: File) => void;
}
