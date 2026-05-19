import { CreateVehiclePayload, PreviewTableProps } from "./api.types";

const parseTime = (time: string): number => {
  return Number(time.replace(":", "").trim());
};

const parseLocation = (value: string) => {
  const [lat, lng] = value.split(",").map(Number);

  return {
    lat,
    lng,
  };
};

export const mapPreviewToVehiclePayloads = ({
  colData,
  tableInfo,
}: PreviewTableProps): CreateVehiclePayload[] => {
  const getCol = (row: string[], label: string) => {
    const col = tableInfo.find((c) => c.label === label);

    return col ? (row[col.fileCol] ?? "") : "";
  };

  return colData.map((row) => ({
    name: getCol(row, "ชื่อรถ"),

    model: getCol(row, "รุ่น"),

    numberPlate: getCol(row, "หมายเลขทะเบียน"),

    maxCapacity: Number(getCol(row, "ความจุน้ำหนัก")),

    maxTask: Number(getCol(row, "จำนวนงานสูงสุด")),

    workTime: {
      start: parseTime(getCol(row, "เวลาเริ่มเดินรถ")),
      end: parseTime(getCol(row, "เวลาสิ้นสุดเดินรถ")),
    },

    breakTime: {
      start: parseTime(getCol(row, "เวลาเริ่มพัก")),
      end: parseTime(getCol(row, "เวลาสิ้นสุดพัก")),
    },

    startLocation: parseLocation(getCol(row, "จุดเริ่มต้น")),

    endLocation: parseLocation(getCol(row, "จุดสิ้นสุด")),

    skills: getCol(row, "ความสามารถเฉพาะ")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  }));
};