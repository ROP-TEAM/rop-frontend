export interface PreviewTableProps {
    colData: string[][];
    tableInfo: {
        fileCol: number;
        label:string;
        errorRows: number[]
    }[];
}