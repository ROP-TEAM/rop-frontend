"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import IconSvgMono from "@/components/Icon/SvgIcon";
import { Modal } from "@/components/Modal/Modal/Modal";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { OrderBase, TimePeriod } from "@/types/api.types";
import styles from "./landing.module.scss";
import Image from "next/image";
import { Location } from "@/types/api.types";
import { useState } from "react";
import { VehicleFileHeader } from "@/components/Modal/VehicleUpload/VehicleUpload.types";
import { VehicleUpload } from "@/components/Modal/VehicleUpload/VehicleUpload";
import { VehicleBase } from "@/types/api.types";
import { OrderUpload } from "@/components/Modal/OrderUpload/OrderUpload";
import { OrderFileHeader } from "@/components/Modal/OrderUpload/OrderUpload.types";
const Page = () => {
  const DEFAULT_HEADER_INDEX = -1;
  const [optimizeCount, setOptimizeCount] = useState<{
    distance: number;
    vehicle: number;
  }>({
    distance: 0,
    vehicle: 0,
  });
  const [isUploadVehicle, setIsUploadVehicle] = useState(false);
  const [isUploadOrder, setIsUploadOrder] = useState(false);
  const [vehicleFile, setVehicleFile] = useState<File>();
  const [orderFile, setOrderFile] = useState<File>();
  const [vehicleBases, setVehicleBases] = useState<VehicleBase[]>([]);
  const [orderBases, setOrderBases] = useState<OrderBase[]>([]);
  const [colDataVehicle, setColDataVehicle] = useState<string[][]>([]);
  const [colDataOrder, setColDataOrder] = useState<string[][]>([]);
  const [isOptimize, setIsOptimize] = useState<boolean>(true);
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
      description: 'คั่นหลาย tag ด้วย , เช่น "ของเย็น,ของสด"',
      value: "skills",
      require: false,
      regex: /^([ก-๙a-zA-Z0-9\s]+(\s*,\s*[ก-๙a-zA-Z0-9\s]+)*)?$/,
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
  const getFileCondition = (): string => {
    if (vehicleBases.length === 0 && orderBases.length === 0) {
      return "ยังไม่ได้อัปโหลดไฟล์ กรุณาอัปโหลดข้อมูลรถและออเดอร์ให้ครบถ้วน";
    }

    if (vehicleBases.length === 0) {
      return "กรุณาอัปโหลดไฟล์ข้อมูลรถ เพื่อใช้วางแผนเส้นทางและจัดรอบการวิ่งงาน";
    }

    if (orderBases.length === 0) {
      return "กรุณาอัปโหลดไฟล์ข้อมูลออเดอร์ปลายทาง เพื่อเริ่มคำนวณเส้นทางการจัดส่ง";
    }

    return "ข้อมูลครบถ้วนพร้อมใช้งาน สามารถเริ่มสร้างรอบรถและวางแผนเส้นทางได้ทันที";
  };
  const getFileName = (file: File | undefined) => {
    if (!file) return;
    let fullName = file.name.replace(".csv", "");
    if (fullName.length > 8) {
      return fullName.substring(0, 8) + "... .csv";
    }
    return fullName + ".csv";
  };

  const getCellVehicle = (fileCol: number, row: number) => {
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
      const model = getCellVehicle(header.model.fileCol, row);

      const name = getCellVehicle(header.name.fileCol, row);

      const maxCapacity = Number(getCellVehicle(header.capacity.fileCol, row));

      const numberPlate = getCellVehicle(header.numberPlate.fileCol, row);

      const workTimeStart = parseTimeToNumber(
        getCellVehicle(header.workTimeStart.fileCol, row),
      );

      const workTimeEnd = parseTimeToNumber(
        getCellVehicle(header.workTimeEnd.fileCol, row),
      );

      let breakTimeStart: number | undefined = parseTimeToNumber(
        getCellVehicle(header.breakTimeStart.fileCol, row),
      );

      let breakTimeEnd: number | undefined = parseTimeToNumber(
        getCellVehicle(header.breakTimeEnd.fileCol, row),
      );

      if (breakTimeStart == 0 || breakTimeEnd == 0) {
        breakTimeStart = undefined;
        breakTimeEnd = undefined;
      }

      const startLocation = parseLocation(
        getCellVehicle(header.startLocation.fileCol, row),
      );

      let endLocationRaw = getCellVehicle(header.endLocation.fileCol, row);

      const endLocation = endLocationRaw
        ? parseLocation(endLocationRaw)
        : startLocation;

      const maxTaskRaw = getCellVehicle(header.maxTask.fileCol, row);

      const maxTask = maxTaskRaw ? Number(maxTaskRaw) : undefined;

      const skills = getCellVehicle(header.skills.fileCol, row)
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
    console.log(vehicleBases);
    setIsUploadVehicle(false);
  };
  const getCellOrder = (fileCol: number, row: number) => {
    if (fileCol == DEFAULT_HEADER_INDEX) return "";

    return colDataOrder[fileCol]?.[row] ?? "";
  };
  const handleCreateOrder = () => {
    const header = orderFileHeader;

    const rowLength = colDataOrder[0]?.length ?? 0;

    for (let row = 1; row < rowLength; row++) {
      const name = getCellOrder(header.name.fileCol, row);

      const description =
        getCellOrder(header.description.fileCol, row) || undefined;

      const capacity = Number(getCellOrder(header.capacity.fileCol, row));

      const timeWindowStart = parseTimeToNumber(
        getCellOrder(header.timeWindowStart.fileCol, row),
      );

      const timeWindowEnd = parseTimeToNumber(
        getCellOrder(header.timeWindowEnd.fileCol, row),
      );

      const location = parseLocation(
        getCellOrder(header.location.fileCol, row),
      );

      const serviceTime = Number(getCellOrder(header.serviceTime.fileCol, row));

      const priorityRaw = getCellOrder(header.priority.fileCol, row);

      const priorityMap: Record<string, number> = {
        สูงมาก: 3,
        สูง: 2,
        ปานกลาง: 1,
        ต่ำ: 0,
      };

      const priority = priorityMap[priorityRaw] ?? 1;

      const skills = getCellOrder(header.skills.fileCol, row)
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

      const orderBase: OrderBase = {
        name,
        description,
        capacity,
        skils: skills.length > 0 ? skills : undefined,
        timeWindowStart,
        timeWindowEnd,
        locationLat: location.lat,
        locationLng: location.lng,
        serviceTime,
        type: 0,
        priority,
      };

      setOrderBases((prev) => [...prev, orderBase]);
    }

    setIsUploadOrder(false);
  };
  const handleClearOptimize = () => {
    setIsOptimize(false);
    setVehicleFileHeader((prev) => {
      const updated = vehicleFileHeader;
      Object.keys(updated).forEach((key) => {
        const typedKey = key as keyof VehicleFileHeader;
        updated[typedKey].fileCol = -1;
      });
      return updated;
    });
    setOrderFileHeader((prev) => {
      const updated = orderFileHeader;
      Object.keys(updated).forEach((key) => {
        const typedKey = key as keyof OrderFileHeader;
        updated[typedKey].fileCol = -1;
      });
      return updated;
    });
    setColDataOrder([]);
    setColDataVehicle([]);
    setVehicleFile(undefined);
    setOrderFile(undefined);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.titleInfo}>
            <h2 className={styles.titleText}>สร้างรอบรถของคุณ</h2>
            <div className={styles.titleDescription}>
              <span className={styles.normal}>
                อัปโหลดไฟล์และสร้างรอบรถได้ง่าย ๆ ภายในไม่กี่ขั้นตอน
                ทั้งนี้ผลลัพธ์อาจแตกต่างกันเล็กน้อยในแต่ละครั้ง
                ซึ่งเป็นพฤติกรรมปกติของระบบที่ออกแบบมาเพื่อเลือกแนวทางการจัดรอบที่เหมาะสมที่สุด
                หรือ
                <span className={styles.report}> พบปัญหาการใช้งาน</span>
              </span>
            </div>
          </div>
          <button className={styles.titleAction}>ติดต่อเรา</button>
        </div>
        {isOptimize ? (
          <div className={styles.optimize}>
            <div className={styles.optimizeHeader}>
              <h2 className={styles.optimizeTitle}>ผลการคำนวณ</h2>
              <Tooltip title="ลองใหม่">
                <button type="button">
                  <IconSvgMono src="/icon/reload.svg" size={24}></IconSvgMono>
                </button>
              </Tooltip>
            </div>
            <div className={styles.optimizeContent}>
              <div className={styles.optimizeBox}>
                <h2 className={styles.optimizeType}>รถที่ใช้ในการเดินทาง</h2>
                <div className={styles.optimizeInfo}>
                  <h1 className={styles.optimizeVariable}>
                    {optimizeCount.vehicle}
                  </h1>
                  <p className={styles.optimizeUnit}>คัน</p>
                </div>
              </div>
              <div className={styles.optimizeBox}>
                <h2 className={styles.optimizeType}>ระยะทางทั้งหมด </h2>
                <div className={styles.optimizeInfo}>
                  <h1 className={styles.optimizeVariable}>
                    {optimizeCount.vehicle}
                  </h1>
                  <p className={styles.optimizeUnit}>กม.</p>
                </div>
              </div>
            </div>
            <div className={styles.optimizeFooter}>
              <button type="button" className={styles.optimizeAction}>
                ดาวโหลดไฟล์
              </button>
              <Tooltip title="ล้างค่า">
                <button
                  onClick={() => handleClearOptimize()}
                  className={styles.optimizeCloseContainer}
                >
                  <IconSvgMono
                    className={styles.optimizeClose}
                    size={20}
                    src="/icon/cross.svg"
                    color="var(--p-500)"
                  ></IconSvgMono>
                </button>
              </Tooltip>
            </div>
          </div>
        ) : (
          <div>
            <section className={styles.uploadContainer}>
              <div
                style={{
                  border:
                    vehicleBases.length > 0
                      ? "0.125rem solid var(--s-500)"
                      : "0.0625rem solid rgba(27, 31, 35, 0.15)",
                }}
                className={styles.uploadContent}
              >
                <Modal
                  marginTop="4rem"
                  isActive={isUploadVehicle}
                  onClose={() => setIsUploadVehicle(false)}
                >
                  <VehicleUpload
                    file={vehicleFile}
                    setFile={setVehicleFile}
                    handleCreateVehicles={handleCreateVehicles}
                    colData={colDataVehicle}
                    setColData={setColDataVehicle}
                    onClose={() => setIsUploadVehicle(false)}
                    vehicleFileHeader={vehicleFileHeader}
                    setVehicleFileHeader={setVehicleFileHeader}
                  ></VehicleUpload>
                </Modal>
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
                  <h2 className={styles.uploadText}>
                    {vehicleBases.length > 0
                      ? getFileName(vehicleFile)
                      : "ไฟล์รถที่ใช้งาน"}
                    {vehicleBases.length > 0 && (
                      <IconSvgMono
                        src="/icon/starCheck.svg"
                        color="var(--s-500)"
                        size={22}
                      ></IconSvgMono>
                    )}
                  </h2>
                  <p className={styles.uploadDescription}>
                    {vehicleBases.length > 0
                      ? `พบข้อมูลรถทั้งหมด ${Math.max(
                          (colDataVehicle[0]?.length ?? 1) - 1,
                          0,
                        )} คัน พร้อมข้อมูลเวลาและตำแหน่งสำหรับใช้วางแผนเส้นทาง `
                      : "อัปโหลดไฟล์ข้อมูลยานพาหนะ เช่น รุ่นรถ เวลาทำงาน ความจุ และตำแหน่งเริ่มต้น เพื่อใช้คำนวณและวางแผนเส้นทางการวิ่งงาน"}
                  </p>
                  <button
                    className={styles.uploadAction}
                    onClick={() => setIsUploadVehicle(true)}
                    type="button"
                  >
                    {vehicleBases.length > 0 ? "เปลี่ยนไฟล์" : "เลือกไฟล์"}
                  </button>
                </div>
              </div>
              <div
                style={{
                  border:
                    orderBases.length > 0
                      ? "0.125rem solid var(--s-500)"
                      : "0.0625rem solid rgba(27, 31, 35, 0.15)",
                }}
                className={styles.uploadContent}
              >
                <Modal
                  marginTop="4rem"
                  isActive={isUploadOrder}
                  onClose={() => setIsUploadOrder(false)}
                >
                  <OrderUpload
                    handleCreateOrder={handleCreateOrder}
                    file={orderFile}
                    setFile={setOrderFile}
                    // handleCreateVehicles={handleCreateVehicles}
                    colData={colDataOrder}
                    setColData={setColDataOrder}
                    onClose={() => setIsUploadOrder(false)}
                    orderFileHeader={orderFileHeader}
                    setOrderFileHeader={setOrderFileHeader}
                  ></OrderUpload>
                </Modal>
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
                  <h2 className={styles.uploadText}>
                    {orderBases.length > 0
                      ? getFileName(orderFile)
                      : "ไฟล์ออเดอร์ปลายทาง"}
                    {orderBases.length > 0 && (
                      <IconSvgMono
                        src="/icon/starCheck.svg"
                        color="var(--s-500)"
                        size={22}
                      ></IconSvgMono>
                    )}
                  </h2>
                  <p className={styles.uploadDescription}>
                    {orderBases.length > 0
                      ? `พบข้อมูลงานจัดส่งทั้งหมด ${Math.max(
                          (colDataOrder[0]?.length ?? 1) - 1,
                          0,
                        )} รายการ พร้อมข้อมูลตำแหน่งและช่วงเวลาให้บริการ`
                      : "อัปโหลดไฟล์ข้อมูลออเดอร์ปลายทาง เช่น จุดจัดส่ง ช่วงเวลาให้บริการ น้ำหนักสินค้า และเงื่อนไขเฉพาะของงาน"}
                  </p>
                  <button
                    onClick={() => setIsUploadOrder(true)}
                    className={styles.uploadAction}
                    type="button"
                  >
                    {orderBases.length > 0 ? "เปลี่ยนไฟล์" : "เลือกไฟล์"}
                  </button>
                </div>
              </div>
            </section>
            <section className={styles.actionSection}>
              <p className={styles.actionInfo}>{getFileCondition()}</p>
              <button
                disabled={!(vehicleBases.length > 0 && orderBases.length > 0)}
                className={`${styles.sendAction}  ${!(vehicleBases.length > 0 && orderBases.length > 0) ? styles.isActive : ""}`}
              >
                จัดรอบรถ
              </button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
