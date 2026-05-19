"use client";
import { Modal } from "@/components/Modal/Modal/Modal";
import { useEffect, useState } from "react";
import { VehicleUpload } from "@/components/Modal/VehicleUpload/VehicleUpload";
import { VehicleFileHeader } from "@/components/Modal/VehicleUpload/VehicleUpload.types";
const Vehicle = () => {
  const DEFAULT_HEADER_INDEX = -1;
  const [vehicleFileHeader, setVehicleFileHeader] = useState<VehicleFileHeader>(
    {
      workTimeStart: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "เวลาเริ่มทำงาน",
        description: "รูปแบบ HH:MM หรือ HH.MM",
        value: "workTimeStart",
        require: true,
        regex: /^([01]\d|2[0-3])[:.]([0-5]\d)$/,
      },

      workTimeEnd: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "เวลาสิ้นสุดงาน",
        description: "รูปแบบ HH:MM หรือ HH.MM",
        value: "workTimeEnd",
        require: true,
        regex: /^([01]\d|2[0-3])[:.]([0-5]\d)$/,
      },
      capacity: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "น้ำหนักบรรทุก",
        description: "ตัวเลขมากกว่า 0",
        value: "capacity",
        require: true,
        regex: /^[1-9]\d*$/,
      },

      startLocation: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "ตำแหน่งเริ่มต้น",
        description: "รูปแบบ latitude,longitude",
        value: "startLocation",
        require: true,
        regex:
          /^-?(90(?:\.0{1,6})?|[0-8]?\d(?:\.\d{1,6})?),-?(180(?:\.0{1,6})?|1[0-7]\d(?:\.\d{1,6})?|\d{1,2}(?:\.\d{1,6})?)$/,
      },

      endLocation: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "ตำแหน่งสิ้นสุด",
        description: "ถ้าต้องการให้กลับมาจุดเริ่มต้นให้เว้นว่างไว้",
        value: "endLocation",
        require: false,
        regex:
          /^(-?(90(?:\.0{1,6})?|[0-8]?\d(?:\.\d{1,6})?),-?(180(?:\.0{1,6})?|1[0-7]\d(?:\.\d{1,6})?|\d{1,2}(?:\.\d{1,6})?))?$/,
      },

      maxTask: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "จำนวนภาระงานสูงสุด",
        description: "ตัวเลขตั้งแต่ 0 ขึ้นไป หากไม่จำกัดให้เว้นว่าง",
        value: "maxTask",
        require: false,
        regex: /^(?:0|[1-9]\d*)?$/,
      },

      skills: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "ความสามารถเฉพาะ",
        description: 'คั่นด้วย , เช่น "ของเย็น,ผักสด"',
        value: "skills",
        require: false,
        regex: /^([ก-๙a-zA-Z0-9\s]+(,[ก-๙a-zA-Z0-9\s]+)*)?$/,
      },

      model: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "รุ่นรถ",
        description: "ชื่อรุ่นรถ เช่น Toyota Revo",
        value: "model",
        require: false,
      },

      name: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "ชื่อรถหรือชื่อพนักงาน",
        description: "สามารถเว้นว่างได้",
        value: "name",
        require: false,
      },

      numberPlate: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "ทะเบียนรถ",
        description: "เช่น กข1234",
        value: "numberPlate",
        require: false,
      },
    },
  );
  const [isUpload, setIsUpload] = useState<boolean>(true);
  return (
    <div>
      <Modal
        isActive={isUpload}
        marginTop="2rem"
        onClose={() => setIsUpload(false)}
      >
        <VehicleUpload
          onClose={() => setIsUpload(false)}
          vehicleFileHeader={vehicleFileHeader}
          setVehicleFileHeader={setVehicleFileHeader}
        ></VehicleUpload>
      </Modal>
    </div>
  );
};
export default Vehicle;
