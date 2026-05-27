"use client";

import { Modal } from "@/components/modal/Modal/Modal";
import { VehicleUpload } from "@/components/modal/VehicleUpload/VehicleUpload";
import { VehicleFileHeader } from "@/components/modal/VehicleUpload/VehicleUpload.types";

import { TextInput } from "@/components/form/TextInput/TextInput";
import TimeInput from "@/components/form/TimeInput/TimeInput";
import { LocationInput } from "@/components/form/LocationInput/LocationInput";
import { SkillInput } from "@/components/form/SkillInput/SkillInput";

import styles from "./page.module.scss";
import { Vehicle } from "@/types/api.types";

import { useCallback, useEffect, useRef, useState } from "react";

const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Truck Alpha",
    numberPlate: "81-1234",
    maxCapacity: 12,
    maxTask: 5,
    model: "Hino",
    workTime: { start: 800, end: 1800 },
    breakTime: { start: 1200, end: 1300 },
    startLocation: { lat: 16.1479, lng: 17.1578 },
    endLocation: { lat: 16.2479, lng: 17.2578 },
    skills: [
      { id: 1, name: "ห้องเย็น", color: "#FB923C" },
      { id: 3, name: "GPS Tracking", color: "#4ADE80" },
    ],
  },
  {
    id: 2,
    name: "Truck Beta",
    numberPlate: "72-4589",
    maxCapacity: 17,
    maxTask: 3,
    model: "Isuzu",
    workTime: { start: 630, end: 1630 },
    breakTime: { start: 1130, end: 1200 },
    startLocation: { lat: 16.3479, lng: 17.4578 },
    endLocation: { lat: 16.4479, lng: 17.5578 },
    skills: [{ id: 2, name: "ขนส่งด่วน", color: "#FACC15" }],
  },
  {
    id: 3,
    name: "Truck Gamma",
    numberPlate: "94-7711",
    maxCapacity: 15,
    maxTask: 4,
    model: "Hino",
    workTime: { start: 900, end: 2000 },
    breakTime: { start: 1400, end: 1500 },
    startLocation: { lat: 16.5479, lng: 17.6578 },
    endLocation: { lat: 16.6479, lng: 17.7578 },
    skills: [
      { id: 1, name: "ห้องเย็น", color: "#FB923C" },
      { id: 4, name: "ขนส่งสารเคมี", color: "#F472B6" },
    ],
  },
  {
    id: 4,
    name: "Truck Delta",
    numberPlate: "53-9902",
    maxCapacity: 10,
    maxTask: 6,
    model: "Mitsubishi",
    workTime: { start: 700, end: 1700 },
    breakTime: { start: 1230, end: 1330 },
    startLocation: { lat: 16.7479, lng: 17.8578 },
    endLocation: { lat: 16.8479, lng: 17.9578 },
    skills: [{ id: 4, name: "ขนส่งสารเคมี", color: "#F472B6" }],
  },
  {
    id: 5,
    name: "Truck Omega",
    numberPlate: "11-6428",
    maxCapacity: 50,
    maxTask: 2,
    model: "Scania",
    workTime: { start: 1000, end: 1900 },
    breakTime: { start: 1500, end: 1530 },
    startLocation: { lat: 16.9479, lng: 18.0578 },
    endLocation: { lat: 17.0479, lng: 18.1578 },
    skills: [
      { id: 5, name: "ควบคุมอุณหภูมิ", color: "#F9A8D4" },
      { id: 3, name: "GPS Tracking", color: "#4ADE80" },
    ],
  },
];

const toTimeValue = (hhmm: number) => {
  const str = hhmm.toString().padStart(4, "0");

  return {
    hours: str.slice(0, 2),
    minutes: str.slice(2, 4),
  };
};

const toNumberTime = ({
  hours,
  minutes,
}: {
  hours: string;
  minutes: string;
}) => {
  return Number(`${hours.padStart(2, "0")}${minutes.padStart(2, "0")}`);
};

const VehiclePage = ({ vehicles = mockVehicles }: { vehicles?: Vehicle[] }) => {
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
  const [vehicleData, setVehicleData] = useState<Vehicle[]>(vehicles);

  const handleChange = (id: number, field: keyof Vehicle, value: string) => {
    setVehicleData((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              [field]:
                field === "maxCapacity" || field === "maxTask"
                  ? Number(value)
                  : value,
            }
          : v,
      ),
    );
  };

  const columns = [
    {
      label: "ชื่อรถ",
      render: (v: Vehicle) => (
        <TextInput
          value={v.name}
          onChange={(value) => handleChange(v.id, "name", value)}
          color="var(--p-1000)"
          width="10rem"
        />
      ),
    },
    {
      label: "หมายเลขทะเบียน",
      render: (v: Vehicle) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src="/icon/profile.svg"
            width={24}
            height={24}
            style={{ borderRadius: "50%" }}
          />
          <TextInput
            value={v.numberPlate || "-"}
            onChange={(value) => handleChange(v.id, "numberPlate", value)}
            color="var(--p-1000)"
          />
        </div>
      ),
    },
    {
      label: "ความจุน้ำหนัก",
      render: (v: Vehicle) => (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <TextInput
            value={v.maxCapacity.toString()}
            onChange={(value) => handleChange(v.id, "maxCapacity", value)}
            color="var(--p-1000)"
            width="2rem"
          />

          <span>ตัน</span>
        </div>
      ),
    },
    {
      label: "ความสามารถเฉพาะ",
      render: (v: Vehicle) => (
        <SkillInput
          skills={[]}
          value={(v.skills ?? []).map((s) => ({
            id: s.id,
            title: s.name,
            color: s.color,
          }))}
          onChange={(newSkills) => {
            setVehicleData((prev) =>
              prev.map((item) =>
                item.id === v.id
                  ? {
                      ...item,
                      skills: newSkills.map((skill) => ({
                        id: skill.id,
                        name: skill.title,
                        color: skill.color,
                      })),
                    }
                  : item,
              ),
            );
          }}
        />
      ),
    },
    {
      label: "เวลาเริ่มเดินรถ",
      render: (v: Vehicle) => (
        <TimeInput
          width="5rem"
          value={toTimeValue(v.workTime.start)}
          onBlur={(time) => {
            if (time.hours.length < 2 || time.minutes.length < 2) return;
            setVehicleData((prev) =>
              prev.map((item) =>
                item.id === v.id
                  ? {
                      ...item,
                      workTime: { ...item.workTime, start: toNumberTime(time) },
                    }
                  : item,
              ),
            );
          }}
        />
      ),
    },
    {
      label: "เวลาสิ้นสุดเดินรถ",
      render: (v: Vehicle) => (
        <TimeInput
          width="5rem"
          value={toTimeValue(v.workTime.end)}
          onBlur={(time) => {
            if (time.hours.length < 2 || time.minutes.length < 2) return;
            setVehicleData((prev) =>
              prev.map((item) =>
                item.id === v.id
                  ? {
                      ...item,
                      workTime: {
                        ...item.workTime,
                        end: toNumberTime(time),
                      },
                    }
                  : item,
              ),
            );
          }}
        />
      ),
    },
    {
      label: "เวลาเริ่มพัก",
      render: (v: Vehicle) => (
        <TimeInput
          width="5rem"
          value={toTimeValue(v.breakTime.start)}
          onBlur={(time) => {
            if (time.hours.length < 2 || time.minutes.length < 2) return;
            setVehicleData((prev) =>
              prev.map((item) =>
                item.id === v.id
                  ? {
                      ...item,
                      breakTime: {
                        ...item.breakTime,
                        start: toNumberTime(time),
                      },
                    }
                  : item,
              ),
            );
          }}
        />
      ),
    },
    {
      label: "เวลาสิ้นสุดพัก",
      render: (v: Vehicle) => (
        <TimeInput
          width="5rem"
          value={toTimeValue(v.breakTime.end)}
          onBlur={(time) => {
            if (time.hours.length < 2 || time.minutes.length < 2) return;
            setVehicleData((prev) =>
              prev.map((item) =>
                item.id === v.id
                  ? {
                      ...item,
                      breakTime: {
                        ...item.breakTime,
                        end: toNumberTime(time),
                      },
                    }
                  : item,
              ),
            );
          }}
        />
      ),
    },
    {
      label: "จุดเริ่มต้น",
      render: (v: Vehicle) => (
        <LocationInput
          inputId={`start-location-${v.id}`}
          value={v.startLocation}
          color="var(--p-1000)"
          fontSize="0.875rem"
          onChange={(location) => {
            setVehicleData((prev) =>
              prev.map((item) =>
                item.id === v.id
                  ? {
                      ...item,
                      startLocation: location,
                    }
                  : item,
              ),
            );
          }}
        />
      ),
    },
    {
      label: "จุดสิ้นสุด",
      render: (v: Vehicle) => (
        <LocationInput
          inputId={`end-location-${v.id}`}
          value={v.endLocation}
          color="var(--p-1000)"
          fontSize="0.875rem"
          onChange={(location) => {
            setVehicleData((prev) =>
              prev.map((item) =>
                item.id === v.id
                  ? {
                      ...item,
                      endLocation: location,
                    }
                  : item,
              ),
            );
          }}
        />
      ),
    },
  ];

  const tableRef = useRef<HTMLTableElement>(null);
  const [colWidths, setColWidths] = useState<number[]>([]);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (tableRef.current) {
      const ths = tableRef.current.querySelectorAll("thead th");

      const widths = Array.from(ths).map(
        (th) => (th as HTMLElement).scrollWidth + 32,
      );

      setColWidths(widths);

      requestAnimationFrame(() => {
        setReady(true);
      });
    }
  }, []);

  const handleMouseDown = useCallback(
    (index: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startLeftWidth = colWidths[index + 1];
      const startRightWidth = colWidths[index + 2];

      const onMouseMove = (e: MouseEvent) => {
        const diff = e.clientX - startX;
        const newLeft = Math.max(60, startLeftWidth + diff);
        const newRight = Math.max(60, startRightWidth - diff);

        setColWidths((prev) => {
          const next = [...prev];
          next[index + 1] = newLeft;
          next[index + 2] = newRight;
          return next;
        });
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [colWidths],
  );

  return (
    <>
      <Modal
        isActive={isUpload}
        marginTop="2rem"
        onClose={() => setIsUpload(false)}
      >
        <VehicleUpload
          onClose={() => setIsUpload(false)}
          vehicleFileHeader={vehicleFileHeader}
          setVehicleFileHeader={setVehicleFileHeader}
        />
      </Modal>

      <div className={styles.wrapper}>
        <table
          ref={tableRef}
          className={`${styles.table} ${ready ? styles.fixed : styles.auto}`}
        >
          <colgroup>
            {colWidths.map((w, i) => (
              <col key={i} style={{ width: w }} />
            ))}
          </colgroup>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.indexCol} />
              {columns.map((col, i) => (
                <th key={col.label}>
                  {col.label}
                  {i < columns.length - 1 && (
                    <span
                      className={`${styles.resizer} ${hoveredCol === i + 1 ? styles.resizerVisible : ""}`}
                      onMouseDown={handleMouseDown(i)}
                      onMouseEnter={() => setHoveredCol(i + 1)}
                      onMouseLeave={() => setHoveredCol(null)}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {vehicleData.map((v, row) => (
              <tr key={v.id}>
                <td className={styles.indexCol}>{row + 1}</td>
                {columns.map((col, i) => (
                  <td key={col.label}>
                    {col.render(v)}
                    {i < columns.length - 1 && (
                      <span
                        className={`${styles.resizer} ${hoveredCol === i + 1 ? styles.resizerVisible : ""}`}
                        onMouseDown={handleMouseDown(i)}
                        onMouseEnter={() => setHoveredCol(i + 1)}
                        onMouseLeave={() => setHoveredCol(null)}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default VehiclePage;
