"use client";
import { useState } from "react";
import { Modal } from "@/components/Modal/Modal/Modal";
import { OrderFileHeader } from "@/components/Modal/OrderUpload/OrderUpload.types";
import { OrderUpload } from "@/components/Modal/OrderUpload/OrderUpload";
const Orders = () => {
  const DEFAULT_HEADER_INDEX = -1;
  const [isUpload, setIsUpload] = useState(false);
  const [orderFileHeader, setOrderFileHeader] = useState<OrderFileHeader>({
    name: {
      fileCol: DEFAULT_HEADER_INDEX,
      errorRows: [],
      label: "ชื่องาน",
      description: "ชื่องานหรือรหัสออเดอร์",
      value: "name",
      require: true,
    },

    description: {
      fileCol: DEFAULT_HEADER_INDEX,
      errorRows: [],
      label: "รายละเอียด",
      description: "รายละเอียดเพิ่มเติมของงาน",
      value: "description",
      require: false,
    },

    capacity: {
      fileCol: DEFAULT_HEADER_INDEX,
      errorRows: [],
      label: "น้ำหนักสินค้า",
      description: "ตัวเลขมากกว่า 0",
      value: "capacity",
      require: true,
      regex: /^[1-9]\d*$/,
    },

    skills: {
      fileCol: DEFAULT_HEADER_INDEX,
      errorRows: [],
      label: "ความสามารถเฉพาะ",
      description: 'ระบุได้เพียง 1 tag เช่น "ของเย็น"',
      value: "skills",
      require: false,
      regex: /^[ก-๙a-zA-Z0-9\s]+$/,
    },

    timeWindowStart: {
      fileCol: DEFAULT_HEADER_INDEX,
      errorRows: [],
      label: "เวลาเปิดร้าน",
      description: "รูปแบบ HH:MM หรือ HH.MM",
      value: "timeWindowStart",
      require: true,
      regex: /^([01]\d|2[0-3])[:.]([0-5]\d)$/,
    },

    timeWindowEnd: {
      fileCol: DEFAULT_HEADER_INDEX,
      errorRows: [],
      label: "เวลาปิดร้าน",
      description: "รูปแบบ HH:MM หรือ HH.MM",
      value: "timeWindowEnd",
      require: true,
      regex: /^([01]\d|2[0-3])[:.]([0-5]\d)$/,
    },

    location: {
      fileCol: DEFAULT_HEADER_INDEX,
      errorRows: [],
      label: "ตำแหน่งจัดส่ง",
      description: "รูปแบบ latitude,longitude",
      value: "location",
      require: true,
      regex:
        /^-?(90(?:\.0{1,6})?|[0-8]?\d(?:\.\d{1,6})?),-?(180(?:\.0{1,6})?|1[0-7]\d(?:\.\d{1,6})?|\d{1,2}(?:\.\d{1,6})?)$/,
    },

    serviceTime: {
      fileCol: DEFAULT_HEADER_INDEX,
      errorRows: [],
      label: "เวลาให้บริการ",
      description: "หน่วยเป็นนาที เช่น 15",
      value: "serviceTime",
      require: true,
      regex: /^(?:0|[1-9]\d*)$/,
    },

    type: {
      fileCol: DEFAULT_HEADER_INDEX,
      errorRows: [],
      label: "ประเภทงาน",
      description: "pickup หรือ delivery",
      value: "type",
      require: true,
      regex: /^(pickup|delivery)$/,
    },
    priority: {
      fileCol: DEFAULT_HEADER_INDEX,
      errorRows: [],
      label: "ลำดับความสำคัญ",
      description: 'กรอกได้เฉพาะ "สูงมาก", "สูง", "ปานกลาง", "ต่ำ"',
      value: "priority",
      require: false,

      regex: /^(สูงมาก|สูง|ปานกลาง|ต่ำ)$/,
    },
  });
  return (
    <div>
      Order
      <Modal
        marginTop="5rem"
        onClose={() => setIsUpload(false)}
        isActive={isUpload}
      >
        <OrderUpload
          setOrderFileHeader={setOrderFileHeader}
          onClose={() => setIsUpload(false)}
          orderFileHeader={orderFileHeader}
        ></OrderUpload>
      </Modal>
      <button type="button" onClick={() => setIsUpload(true)}>
        Click
      </button>
    </div>
  );
};

export default Orders;
