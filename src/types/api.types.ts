export interface Vehicle extends VehicleBase {
  id: number;
}

export interface PreviewTableProps {
  colData: string[][];
  tableInfo: { fileCol: number; label: string; errorRows: number[] }[];
}
