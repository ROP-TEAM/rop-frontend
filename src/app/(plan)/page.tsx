"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Modal } from "@/components/Modal/Modal/Modal";
import { TimePeriod } from "@/types/api.types";
import styles from "./landing.module.scss";
import Image from "next/image";
import { Location } from "@/types/api.types";
import { useState } from "react";
import { VehicleFileHeader } from "@/components/Modal/VehicleUpload/VehicleUpload.types";
import { VehicleUpload } from "@/components/Modal/VehicleUpload/VehicleUpload";
import { VehicleBase } from "@/types/api.types";
const Page = () => {
  const DEFAULT_HEADER_INDEX = -1;
  const [isUploadVehicle, setIsUploadVehicle] = useState(false);
  const [isUploadOrder, setIsUploadOrder] = useState(false);
  const [vehicleBases, setVehicleBases] = useState<VehicleBase[]>([]);
  const [colDataVehicle, setColDataVehicle] = useState<string[][]>([]);
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
      breakTimeStart: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "เวลาพักเริ่มต้น",
        description: "รูปแบบ HH:MM หรือ HH.MM หากไม่มีให้เว้นว่าง",
        value: "breakTimeStart",
        require: false,
        regex: /^(([01]\d|2[0-3])[:.]([0-5]\d))?$/,
      },

      breakTimeEnd: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "เวลาพักสิ้นสุด",
        description: "รูปแบบ HH:MM หรือ HH.MM หากไม่มีให้เว้นว่าง",
        value: "breakTimeEnd",
        require: false,
        regex: /^(([01]\d|2[0-3])[:.]([0-5]\d))?$/,
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

  const getCell = (fileCol: number, row: number) => {
    if (fileCol == DEFAULT_HEADER_INDEX) return "";
    return colDataVehicle[fileCol][row];
  };

  const parseTimeToNumber = (time?: string): number => {
    if (!time) return 0;

    const [hour, minute] = time.split(/[:.]/).map(Number);

    return hour * 60 + minute;
  };

  const parseLocation = (location?: string): Location => {
    if (!location) {
      return {
        lat: 0,
        lng: 0,
      };
    }

    const [lat, lng] = location.split(",");

    return {
      lat: Number(lat),
      lng: Number(lng),
    };
  };

  const handleCreateVehicles = () => {
    const header = vehicleFileHeader;

    const rowLenght = colDataVehicle[0]?.length ?? 0;

    for (let row = 1; row < rowLenght; row++) {
      const model = getCell(header.model.fileCol, row);

      const name = getCell(header.name.fileCol, row);

      const maxCapacity = Number(getCell(header.capacity.fileCol, row));

      const numberPlate = getCell(header.numberPlate.fileCol, row);

      const workTimeStart = parseTimeToNumber(
        getCell(header.workTimeStart.fileCol, row),
      );

      const workTimeEnd = parseTimeToNumber(
        getCell(header.workTimeEnd.fileCol, row),
      );

      let breakTimeStart: number | undefined = parseTimeToNumber(
        getCell(header.breakTimeStart.fileCol, row),
      );

      let breakTimeEnd: number | undefined = parseTimeToNumber(
        getCell(header.breakTimeEnd.fileCol, row),
      );

      if (breakTimeStart == 0 || breakTimeEnd == 0) {
        breakTimeStart = undefined;
        breakTimeEnd = undefined;
      }

      const startLocation = parseLocation(
        getCell(header.startLocation.fileCol, row),
      );

      let endLocationRaw = getCell(header.endLocation.fileCol, row);

      const endLocation = endLocationRaw
        ? parseLocation(endLocationRaw)
        : startLocation;

      const maxTaskRaw = getCell(header.maxTask.fileCol, row);

      const maxTask = maxTaskRaw ? Number(maxTaskRaw) : undefined;

      const skills = getCell(header.skills.fileCol, row)
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

      const vehicleBase: VehicleBase = {
        model,
        name,
        maxCapacity,
        numberPlate,
        dailyWorkTimeStart: workTimeStart,
        dailyWorkTimeEnd: workTimeEnd,
        dailyBreakTimeStart: breakTimeStart,
        dailyBreakTimeEnd: breakTimeEnd,
        startLocationLat: startLocation.lat,
        startLocationLng: startLocation.lng,
        endLocationLat: endLocation.lat,
        endLocationLng: endLocation.lng,
        maxTask,
        skills,
      };

      setVehicleBases((prev) => [...prev, vehicleBase]);
    }

    console.log(vehicleBases[16]);
    setIsUploadVehicle(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.titleInfo}>
          <h2 className={styles.titleText}>สร้างรอบรถของคุณ</h2>
          <div className={styles.titleDescription}>
            <span className={styles.normal}>
              เพียงแค่อัพโหลดไฟล์
              และสร้างรอบรถแบบที่คุณต้องการได้เพียงไม่กี่ขั้นตอน หรือ
            </span>
            <span className={styles.report}> พบปัญหาการใช้งาน</span>
          </div>
        </div>
        <button className={styles.titleAction}>ติดต่อเรา</button>
      </div>
      <section className={styles.uploadContainer}>
        <Modal
          marginTop="4rem"
          isActive={isUploadVehicle}
          onClose={() => setIsUploadVehicle(false)}
        >
          <VehicleUpload
            handleCreateVehicles={handleCreateVehicles}
            colData={colDataVehicle}
            setColData={setColDataVehicle}
            onClose={() => setIsUploadVehicle(false)}
            vehicleFileHeader={vehicleFileHeader}
            setVehicleFileHeader={setVehicleFileHeader}
          ></VehicleUpload>
        </Modal>
        <div className={styles.uploadContent}>
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src="/flat/vehicle.svg"
              alt="order"
              width={400}
              height={200}
            ></Image>
          </div>
          <div className={styles.uploadInfo}>
            <h2 className={styles.uploadText}>ไฟล์รถที่ใช้งาน</h2>
            <p className={styles.uploadDescription}>
              พุดดิ้งสปาคอมเมนท์ คอร์รัปชั่น คอนโทรล แอปพริคอทโชห่วยเอ๊าะ
              วืดรูบิคแคมเปญมาร์เก็ตติ้ง มาร์ชออสซี่ออโต้เหี่ยวย่นแบรนด์
            </p>
            <button
              className={styles.uploadAction}
              onClick={() => setIsUploadVehicle(true)}
              type="button"
            >
              เลือกไฟล์
            </button>
          </div>
        </div>
        <div className={styles.uploadContent}>
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src="/flat/order.svg"
              alt="order"
              width={350}
              height={200}
            ></Image>
          </div>
          <div className={styles.uploadInfo}>
            <h2 className={styles.uploadText}>ไฟล์ออเดอร์ปลายทาง</h2>
            <p className={styles.uploadDescription}>
              พุดดิ้งสปาคอมเมนท์ คอร์รัปชั่น คอนโทรล แอปพริคอทโชห่วยเอ๊าะ
              วืดรูบิคแคมเปญมาร์เก็ตติ้ง มาร์ชออสซี่ออโต้เหี่ยวย่นแบรนด์
            </p>
            <button className={styles.uploadAction} type="button">
              เลือกไฟล์
            </button>
          </div>
        </div>
      </section>
      <section className={styles.actionSection}>
        <p className={styles.actionInfo}>
          ยังไม่มีไฟล์ — ต้องอัพโหลด {2} ไฟล์ให้เรียบร้อย
        </p>
        <button className={styles.sendAction}>จัดรอบรถ </button>
      </section>
    </div>
  );
};

export default Page;
