import React from "react";
import { SkillPillProps } from "@/components/ui/SkillPill/SkillPill.types";
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
  title: string;
  description?: string;
  fileExample?: string[][];
  skillPill?: SkillPillProps;
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  mappedColData: string[][];
  headerRule: HeaderRule[];
  setMappedColData: React.Dispatch<React.SetStateAction<string[][]>>;
  handleCreate: () => void;
  onClose: () => void;
}
