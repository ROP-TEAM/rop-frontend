"use client";
import { LocationInput } from "@/components/form/LocationInput/LocationInput";
import IconSvgMono from "@/components/Icon/SvgIcon";
import { Modal } from "@/components/modal/Modal/Modal";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { OrderBase } from "../features/order/order.types";
import styles from "./landing.module.scss";
import Image from "next/image";
import { Location } from "@/types/api.types";
import { useEffect, useState } from "react";
import { HeaderRule } from "@/components/modal/UploadStepper/UploadStepper.types";
import { VehicleBase } from "@/types/api.types";
import { UploadStepper } from "@/components/modal/UploadStepper/UploadStepper";
import { useCreateOptimizeMutation } from "../features/optimize/optimizeApi";
import { OptimizeReqPayload } from "../features/optimize/optimize.types";
import Skeleton from "@/components/ui/Skeleton/Skeleton";
const VEHICLE_HEADER_RULE: HeaderRule[] = [
  {
    label: "เวลาเริ่มทำงาน",
    description: "รูปแบบ HH:MM หรือ HH.MM",
    require: true,
    regex: /^(0?\d|1\d|2[0-3])[:.]([0-5]\d)$/,
  },
  {
    label: "เวลาสิ้นสุดงาน",
    description: "รูปแบบ HH:MM หรือ HH.MM",
    require: true,
    regex: /^(0?\d|1\d|2[0-3])[:.]([0-5]\d)$/,
  },
  {
    label: "เวลาพักเริ่มต้น",
    description: "รูปแบบ HH:MM หรือ HH.MM หากไม่มีให้เว้นว่าง",
    require: true,
    regex: /^((0?\d|1\d|2[0-3])[:.]([0-5]\d))?$/,
  },
  {
    label: "เวลาพักสิ้นสุด",
    description: "รูปแบบ HH:MM หรือ HH.MM หากไม่มีให้เว้นว่าง",
    require: true,
    regex: /^((0?\d|1\d|2[0-3])[:.]([0-5]\d))?$/,
  },
  {
    label: "น้ำหนักบรรทุก",
    description: "ตัวเลขมากกว่า 0",
    require: true,
    regex: /^[1-9]\d*$/,
  },
  {
    label: "ชื่อรถหรือชื่อพนักงาน",
    description: "รถบุเป็นตัวอักษร",
    require: true,
  },

  {
    label: "จำนวนภาระงานสูงสุด",
    description: "ตัวเลขตั้งแต่ 0 ขึ้นไป หากไม่จำกัดให้เว้นว่าง",
    require: false,
    regex: /^(?:0|[1-9]\d*)?$/,
  },
  {
    label: "ความสามารถเฉพาะ",
    description: 'คั่นด้วย , เช่น "ของเย็น,ผักสด"',
    require: false,
    regex: /^([ก-๙a-zA-Z0-9\s]+(,[ก-๙a-zA-Z0-9\s]+)*)?$/,
  },
  {
    label: "รุ่นรถ",
    description: "ชื่อรุ่นรถ เช่น Toyota Revo",
    require: false,
  },
  {
    label: "ทะเบียนรถ",
    description: "เช่น กข1234",
    require: false,
  },
];
const ORDER_HEADER_RULE: HeaderRule[] = [
  {
    label: "ชื่องาน",
    description: "ชื่องานหรือรหัสออเดอร์",
    require: true,
  },
  {
    label: "น้ำหนักสินค้า",
    description: "ตัวเลขมากกว่า 0",
    require: true,
    regex: /^[1-9]\d*$/,
  },
  {
    label: "เวลาเปิดร้าน",
    description: "รูปแบบ HH:MM หรือ HH.MM",
    require: true,
    regex: /^(0?\d|1\d|2[0-3])[:.]([0-5]\d)$/,
  },
  {
    label: "เวลาปิดร้าน",
    description: "รูปแบบ HH:MM หรือ HH.MM",
    require: true,
    regex: /^(0?\d|1\d|2[0-3])[:.]([0-5]\d)$/,
  },
  {
    label: "ตำแหน่งจัดส่ง",
    description: "รูปแบบ latitude,longitude",
    require: true,
    regex:
      /^-?(90(?:\.0{1,6})?|[0-8]?\d(?:\.\d{1,6})?),-?(180(?:\.0{1,6})?|1[0-7]\d(?:\.\d{1,6})?|\d{1,2}(?:\.\d{1,6})?)$/,
  },
  {
    label: "เวลาให้บริการ",
    description: "เวลาที่ให้บริกการในร้านค้า หน่วยเป็นนาที เช่น 15",
    require: true,
    regex: /^(?:0|[1-9]\d*)$/,
  },

  {
    label: "รายละเอียด",
    description: "รายละเอียดเพิ่มเติมของงาน",
    require: false,
  },
  {
    label: "ความสามารถเฉพาะ",
    description: 'คั่นหลาย tag ด้วย , เช่น "ของเย็น,ของสด"',
    require: false,
    regex: /^([ก-๙a-zA-Z0-9\s]+(\s*,\s*[ก-๙a-zA-Z0-9\s]+)*)?$/,
  },
  {
    label: "ลำดับความสำคัญ",
    description: 'กรอกได้เฉพาะ "สูงมาก", "สูง", "ปานกลาง", "ต่ำ"',
    require: false,
    regex: /^(สูงมาก|สูง|ปานกลาง|ต่ำ)$/,
  },
];
const VEHICLE_EXAM = [
  [
    "08:00",
    "17:00",
    "12:00",
    "13:00",
    "1200",
    "รถคันที่ 1",
    "25",
    "ของเย็น,ผักสด",
    "Toyota Revo",
    "กข1234",
  ],
  [
    "9.00",
    "18.30",
    "",
    "",
    "800",
    "รถคันที่ 2",
    "",
    "เอกสาร",
    "Isuzu D-Max",
    "1ฒฮ8888",
  ],
  [
    "07:30",
    "16:45",
    "11.30",
    "12.15",
    "1500",
    "พนักงานสมชาย",
    "40",
    "ของสด,ควบคุมอุณหภูมิ",
    "Honda HR-V",
    "ขค5678",
  ],
];
const ORDER_EXAM = [
  [
    "ORD001",
    "120",
    "08:00",
    "17:00",
    "16.4331,102.8245",
    "15",
    "ส่งสินค้าไปสาขา A",
    "ของเย็น,ผักสด",
    "สูง",
  ],
  [
    "ORD002",
    "50",
    "9.00",
    "18.30",
    "16.4419,102.8350",
    "10",
    "ส่งเอกสารให้ลูกค้า",
    "เอกสาร",
    "ปานกลาง",
  ],
  [
    "ORD003",
    "80",
    "07:30",
    "16:45",
    "16.4520,102.8102",
    "20",
    "ส่งผักสดร้านอาหาร",
    "ของสด",
    "สูงมาก",
  ],
];
const Preview = () => {
  const [optimizeCount, setOptimizeCount] = useState<{
    distance: number;
    vehicle: number;
  }>({
    distance: 0,
    vehicle: 0,
  });
  const [createOptimize, { isLoading }] = useCreateOptimizeMutation();
  const [optimizeResult, setOptimizeResult] = useState<string[][]>([]);
  const [loadingCount, setLoadingCount] = useState<number>(0);
  const [isUploadVehicle, setIsUploadVehicle] = useState(false);
  const [depotLoc, setDepotLoc] = useState<Location>({ lat: 0, lng: 0 });
  const [isUploadOrder, setIsUploadOrder] = useState(false);
  const [vehicleFile, setVehicleFile] = useState<File>();
  const [orderFile, setOrderFile] = useState<File>();
  const [vehicleBases, setVehicleBases] = useState<VehicleBase[]>([]);
  const [orderBases, setOrderBases] = useState<OrderBase[]>([]);
  const [colDataVehicle, setColDataVehicle] = useState<string[][]>([]);
  const [colDataOrder, setColDataOrder] = useState<string[][]>([]);
  const [isOptimize, setIsOptimize] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
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

    if (depotLoc.lat === 0 || depotLoc.lng === 0) {
      return "กรุณากำหนดตำแหน่งคลังสินค้า (Depot Location) เพื่อใช้เป็นจุดเริ่มต้นในการวางแผนเส้นทาง";
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

  const parseNumberToTime = (minutes?: number): string => {
    if (minutes == null || minutes < 0) return "00:00";

    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  };
  const parseTimeToNumber = (timeStr: string): number => {
    const [hour, minute] = timeStr.replace(".", ":").split(":");
    const timeNum = Number(hour) * 60 + Number(minute);
    return timeNum;
  };

  const parseLatLng = (location: string) => {
    const latlngStr = location.split(",");
    return latlngStr.map((loc) => +Number(loc).toFixed(6));
  };

  const parsePiorityToNumber = (piorityStr: string) => {
    if (!piorityStr) return 1;
    switch (piorityStr) {
      case "สูงมาก":
        return 3;
      case "สูง":
        return 2;
      case "ปานกลาง":
        return 1;
      case "ต่ำ":
        return 0;
    }
    return 1;
  };

  const handleCreateVeiclePayload = () => {
    const RowLenght = colDataVehicle[0].length;
    const ColLenght = VEHICLE_HEADER_RULE.length;

    const vehicles: VehicleBase[] = [];

    for (let row = 1; row < RowLenght; row++) {
      const newVehicle: Partial<VehicleBase> = {};

      for (let col = 0; col < ColLenght; col++) {
        const label = VEHICLE_HEADER_RULE[col].label;
        const value = colDataVehicle[col]?.[row];

        if (!value) continue;

        switch (label) {
          case "เวลาเริ่มทำงาน":
            newVehicle.workTimeStart = parseTimeToNumber(value);
            break;

          case "เวลาสินสุดงาน":
            newVehicle.workTimeEnd = parseTimeToNumber(value);
            break;

          case "เวลาพักเริ่มต้น":
            newVehicle.breakTimeStart = parseTimeToNumber(value);
            break;

          case "เวลาพักสิ้นสุด":
            newVehicle.breakTimeEnd = parseTimeToNumber(value);
            break;

          case "น้ำหนักบรรทุก":
            newVehicle.capacity = Number(value);
            break;

          case "ชื่อรถหรือชื่อพนักงาน":
            newVehicle.name = value;
            break;

          case "จำนวนภาระงานสูงสุด":
            newVehicle.maxTask = Number(value);
            break;

          case "ความสามารถเฉพาะ":
            newVehicle.skills = value
              .split(",")
              .filter(Boolean)
              .map((item) => ({ name: item.trim() }));
            break;

          case "รุ่นรถ":
            newVehicle.model = value;
            break;

          case "ทะเบียนรถ":
            newVehicle.plateNumber = value;
            break;
        }
      }

      vehicles.push(newVehicle as VehicleBase);
    }

    setVehicleBases(vehicles);
    setIsUploadVehicle(false);
  };

  const handleCreateOrderPayload = () => {
    const RowLenght = colDataOrder[0].length;
    const ColLenght = ORDER_HEADER_RULE.length;

    const orders: OrderBase[] = [];

    for (let row = 1; row < RowLenght; row++) {
      const newOrder: Partial<OrderBase> = {};

      for (let col = 0; col < ColLenght; col++) {
        const label = ORDER_HEADER_RULE[col].label;
        const value = colDataOrder[col]?.[row];

        if (!value) continue;

        switch (label) {
          case "ชื่องาน":
            newOrder.name = value;
            break;
          case "น้ำหนักสินค้า":
            newOrder.capacity = Number(value);
            break;
          case "เวลาเปิดร้าน":
            newOrder.timeWindowStart = parseTimeToNumber(value);
            break;
          case "เวลาปิดร้าน":
            newOrder.timeWindowEnd = parseTimeToNumber(value);
            break;
          case "ตำแหน่งจัดส่ง":
            const [lat, lng] = parseLatLng(value);
            newOrder.desLatitude = lat;
            newOrder.desLongitude = lng;
            break;
          case "เวลาให้บริการ":
            newOrder.serviceTime = Number(value);
            break;
          case "รายละเอียด":
            newOrder.description = value;
            break;
          case "ความสามารถเฉพาะ":
            newOrder.skill = value;
            break;
          case "ลำดับความสำคัญ":
            newOrder.priority = parsePiorityToNumber(value);
            break;
        }
      }

      orders.push(newOrder as OrderBase);
    }
    setOrderBases(orders);
    setIsUploadOrder(false);
  };

  const handleClearOptimize = () => {
    setIsOptimize(false);
  };

  const getDownloadFileResult = () => {
    const header = [
      "ชื่อคนขับ",
      "ชื่อออเดอร์",
      "เวลาที่ไปถึง",
      "เวลาออก",
      "สถานะ",
    ];

    const rows = optimizeResult;

    if (!rows?.length) {
      alert("ไม่มีข้อมูลสำหรับดาวน์โหลด");
      return;
    }

    const csvContent = [
      header.join(","),
      ...rows.map((row) => {
        const [driver, order, arrivalMin, serviceMin, status] = row;

        return [
          driver,
          order,
          parseNumberToTime(Number(arrivalMin)),
          parseNumberToTime(Number(serviceMin)),
          status,
        ].join(",");
      }),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "optimize-result.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleCreateOptimize = async () => {
    setLoadingCount(0);
    const start = performance.now();
    const timer = setInterval(() => {
      const elapsed = Math.floor((performance.now() - start) / 1000);
      setLoadingCount(elapsed);
    }, 100);
    try {
      const payload: OptimizeReqPayload = {
        depotLat: depotLoc.lat,
        depotLon: depotLoc.lng,
        vehicles: vehicleBases,
        orders: orderBases,
        enableAlns: true,
        timeLimitMS: 10000,
        enableMultiTrip: true,
      };
      const result = await createOptimize(payload).unwrap();
      const routes = result.routes;
      const vehicleCount = routes.length;
      const distanceCount = routes.reduce((sum, v) => sum + v.totalDistance, 0);
      setOptimizeCount({ vehicle: vehicleCount, distance: distanceCount });
      setOptimizeResult(
        routes.flatMap((r: any) =>
          r.stops.map((s: any) => [
            r.vehicleName,
            s.orderName,
            s.arrivalMin,
            s.departMin,
            "ส่งสำเร็จ",
          ]),
        ),
      );
      clearInterval(timer);
      setIsOptimize(true);
    } catch (err) {
      clearInterval(timer);
      console.log(err);
    } finally {
      setLoadingCount(0);
    }
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
              {loadingCount > 0 ? (
                <p
                  className={styles.optimizeCount}
                >{`กำลังโหลด ${Math.floor(loadingCount / 60)}.${(loadingCount % 60).toString().padStart(2, "0")} วินาที...`}</p>
              ) : (
                <Tooltip title="ลองใหม่">
                  <button onClick={() => handleCreateOptimize()} type="button">
                    <IconSvgMono src="/icon/reload.svg" size={24}></IconSvgMono>
                  </button>
                </Tooltip>
              )}
            </div>
            <div className={styles.optimizeContent}>
              <div className={styles.optimizeBox}>
                <h2 className={styles.optimizeType}>รถที่ใช้ในการเดินทาง</h2>
                {loadingCount > 0 ? (
                  <Skeleton
                    borderRadius="4rem"
                    width="10rem"
                    height="3rem"
                  ></Skeleton>
                ) : (
                  <div className={styles.optimizeInfo}>
                    <h1 className={styles.optimizeVariable}>
                      {optimizeCount.vehicle} / {vehicleBases.length}
                    </h1>
                    <p className={styles.optimizeUnit}>คัน</p>
                  </div>
                )}
              </div>
              <div className={styles.optimizeBox}>
                <h2 className={styles.optimizeType}>ระยะทางทั้งหมด </h2>
                {loadingCount > 0 ? (
                  <Skeleton
                    borderRadius="4rem"
                    width="10rem"
                    height="3rem"
                  ></Skeleton>
                ) : (
                  <div className={styles.optimizeInfo}>
                    <h1 className={styles.optimizeVariable}>
                      {(optimizeCount.distance / 1000).toFixed(2)}
                    </h1>
                    <p className={styles.optimizeUnit}>กม.</p>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.optimizeFooter}>
              <button
                type="button"
                disabled={loadingCount > 0}
                onClick={() => getDownloadFileResult()}
                className={`${styles.optimizeAction} ${loadingCount > 0 ? styles.disabled : ""}`}
              >
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
            <div className={styles.depotInput}>
              <LocationInput
                isRequire
                color="var(--p-500)"
                labelWeight="500"
                label="พิกัดคลังสินค้า"
                labelGap="0.5rem"
                value={depotLoc}
                onChange={setDepotLoc}
              ></LocationInput>
            </div>
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
                  marginTop="2rem"
                  isActive={isUploadVehicle}
                  onClose={() => setIsUploadVehicle(false)}
                >
                  <UploadStepper
                    fileExample={VEHICLE_EXAM}
                    title="เพิ่มยานพาหนะ"
                    description="สคริปต์ลาเต้ฟรุตชะโนด สี่แยกชัวร์คูลเลอร์จังโก้ซานตาคลอส"
                    skillPill={{ title: "ยานพาหนะ", color: "var(--s-400)" }}
                    file={vehicleFile}
                    headerRule={VEHICLE_HEADER_RULE}
                    setFile={setVehicleFile}
                    mappedColData={colDataVehicle}
                    setMappedColData={setColDataVehicle}
                    handleCreate={() => {
                      handleCreateVeiclePayload();
                    }}
                    onClose={() => setIsUploadVehicle(false)}
                  ></UploadStepper>
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
                    onClick={() => {
                      setColDataVehicle([]);
                      setIsUploadVehicle(true);
                    }}
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
                  <UploadStepper
                    fileExample={ORDER_EXAM}
                    title="เพิ่มยานออเดอร์ปลายทาง"
                    description="สคริปต์ลาเต้ฟรุตชะโนด สี่แยกชัวร์คูลเลอร์จังโก้ซานตาคลอส"
                    skillPill={{ title: "ออเดอร์", color: "red" }}
                    headerRule={ORDER_HEADER_RULE}
                    file={orderFile}
                    setFile={setOrderFile}
                    mappedColData={colDataOrder}
                    setMappedColData={setColDataOrder}
                    handleCreate={() => handleCreateOrderPayload()}
                    onClose={() => setIsUploadOrder(false)}
                  ></UploadStepper>
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
                    onClick={() => {
                      setOrderBases([]);
                      setIsUploadOrder(true);
                    }}
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
              <div>
                {error && (
                  <p className={styles.actionError}>เกิดข้อผิดพลาด: {error}</p>
                )}
                <button
                  onClick={() => handleCreateOptimize()}
                  disabled={
                    !(vehicleBases.length > 0 && orderBases.length > 0) ||
                    (depotLoc.lat == 0 && depotLoc.lng == 0)
                  }
                  className={`${styles.sendAction}  ${
                    !(vehicleBases.length > 0 && orderBases.length > 0) ||
                    loadingCount > 0 ||
                    (depotLoc.lat == 0 && depotLoc.lng == 0)
                      ? styles.isActive
                      : ""
                  }`}
                >
                  {loadingCount > 0.2
                    ? `กำลังจัดรอบ ${Math.floor(loadingCount / 60)}.${(loadingCount % 60).toString().padStart(2, "0")} วินาที`
                    : "จัดรอบรถ"}
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
