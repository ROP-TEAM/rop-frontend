"use client";

import { Modal } from "@/components/modal/Modal/Modal";
import { UploadStepper } from "@/components/modal/UploadStepper/UploadStepper";
import { HeaderRule } from "@/components/modal/UploadStepper/UploadStepper.types";

import { TextInput } from "@/components/form/TextInput/TextInput";
import TimeInput from "@/components/form/TimeInput/TimeInput";
import { LocationInput } from "@/components/form/LocationInput/LocationInput";
import { SkillInput } from "@/components/form/SkillInput/SkillInput";

import styles from "./page.module.scss";

import { useCallback, useEffect, useRef, useState } from "react";
import { Vehicle } from "@/app/features/vehicle/vehicle.types";

const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Truck Alpha",
    plateNumber: "81-1234",
    capacity: 12,
    maxTask: 5,
    model: "Hino",
    workTimeStart: 800,
    workTimeEnd: 1800,
    breakTimeStart: 1200,
    breakTimeEnd: 1300,
    skills: [
      { id: 1, name: "ห้องเย็น", color: "#FB923C" },
      { id: 3, name: "GPS Tracking", color: "#4ADE80" },
    ],
  },
  {
    id: 2,
    name: "Truck Beta",
    plateNumber: "72-4589",
    capacity: 17,
    maxTask: 3,
    model: "Isuzu",
    workTimeStart: 630,
    workTimeEnd: 1630,
    breakTimeStart: 1130,
    breakTimeEnd: 1200,
    skills: [{ id: 2, name: "ขนส่งด่วน", color: "#FACC15" }],
  },
  {
    id: 3,
    name: "Truck Gamma",
    plateNumber: "94-7711",
    capacity: 15,
    maxTask: 4,
    model: "Hino",
    workTimeStart: 900,
    workTimeEnd: 2000,
    breakTimeStart: 1400,
    breakTimeEnd: 1500,
    skills: [
      { id: 1, name: "ห้องเย็น", color: "#FB923C" },
      { id: 4, name: "ขนส่งสารเคมี", color: "#F472B6" },
    ],
  },
  {
    id: 4,
    name: "Truck Delta",
    plateNumber: "53-9902",
    capacity: 10,
    maxTask: 6,
    model: "Mitsubishi",
    workTimeStart: 700,
    workTimeEnd: 1700,
    breakTimeStart: 1230,
    breakTimeEnd: 1330,
    skills: [{ id: 4, name: "ขนส่งสารเคมี", color: "#F472B6" }],
  },
  {
    id: 5,
    name: "Truck Omega",
    plateNumber: "11-6428",
    capacity: 50,
    maxTask: 2,
    model: "Scania",
    workTimeStart: 1000,
    workTimeEnd: 1900,
    breakTimeStart: 1500,
    breakTimeEnd: 1530,
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
  const [file, setFile] = useState<File | undefined>(undefined);
  const [mappedColData, setMappedColData] = useState<string[][]>([]);

  const headerRule: HeaderRule[] = [
    {
      label: "เวลาเริ่มทำงาน",
      description: "รูปแบบ HH:MM หรือ HH.MM",
      require: true,
      regex: /^([01]\d|2[0-3])[:.]([0-5]\d)$/,
    },
    {
      label: "เวลาสิ้นสุดงาน",
      description: "รูปแบบ HH:MM หรือ HH.MM",
      require: true,
      regex: /^([01]\d|2[0-3])[:.]([0-5]\d)$/,
    },
    {
      label: "น้ำหนักบรรทุก",
      description: "ตัวเลขมากกว่า 0",
      require: true,
      regex: /^[1-9]\d*$/,
    },
    {
      label: "ตำแหน่งเริ่มต้น",
      description: "รูปแบบ latitude,longitude",
      require: true,
    },
    {
      label: "ตำแหน่งสิ้นสุด",
      description: "ถ้าต้องการให้กลับมาจุดเริ่มต้นให้เว้นว่างไว้",
      require: false,
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
    },
    {
      label: "รุ่นรถ",
      description: "ชื่อรุ่นรถ เช่น Toyota Revo",
      require: false,
    },
    {
      label: "ชื่อรถหรือชื่อพนักงาน",
      description: "สามารถเว้นว่างได้",
      require: false,
    },
    { label: "ทะเบียนรถ", description: "เช่น กข1234", require: false },
  ];

  const [isUpload, setIsUpload] = useState<boolean>(true);
  const [vehicleData, setVehicleData] = useState<Vehicle[]>(vehicles);

  const handleChange = (id: number, field: keyof Vehicle, value: string) => {
    setVehicleData((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              [field]:
                field === "capacity" || field === "maxTask"
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
            value={v.plateNumber || "-"}
            onChange={(value) => handleChange(v.id, "plateNumber", value)}
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
            value={v.capacity.toString()}
            onChange={(value) => handleChange(v.id, "capacity", value)}
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
          value={toTimeValue(v.workTimeStart)}
          onBlur={(time) => {
            if (time.hours.length < 2 || time.minutes.length < 2) return;
            setVehicleData((prev) =>
              prev.map((item) =>
                item.id === v.id
                  ? {
                  ...item,
                  workTimeStart: toNumberTime(time),
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
          value={toTimeValue(v.workTimeEnd)}
          onBlur={(time) => {
            if (time.hours.length < 2 || time.minutes.length < 2) return;
            setVehicleData((prev) =>
              prev.map((item) =>
                item.id === v.id
                 ? {
                  ...item,
                  workTimeEnd: toNumberTime(time),
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
          value={toTimeValue(v.breakTimeStart ?? 0)}
         onBlur={(time) => {
            if (time.hours.length < 2 || time.minutes.length < 2) return;
            setVehicleData((prev) =>
              prev.map((item) =>
                item.id === v.id
                  ? {
                  ...item,
                  breakTimeStart: toNumberTime(time),
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
          value={toTimeValue(v.breakTimeEnd ?? 0)}
          onBlur={(time) => {
            if (time.hours.length < 2 || time.minutes.length < 2) return;
            setVehicleData((prev) =>
              prev.map((item) =>
                item.id === v.id
                  ? {
                  ...item,
                  breakTimeEnd: toNumberTime(time),
                }
              : item,
              ),
            );
          }}
        />
      ),
    },
    // {
    //   label: "จุดเริ่มต้น",
    //   render: (v: Vehicle) => (
    //     <LocationInput
    //       inputId={`start-location-${v.id}`}
    //       value={v.startLocation}
    //       color="var(--p-1000)"
    //       fontSize="0.875rem"
    //       onChange={(location) => {
    //         setVehicleData((prev) =>
    //           prev.map((item) =>
    //             item.id === v.id
    //               ? {
    //                   ...item,
    //                   startLocation: location,
    //                 }
    //               : item,
    //           ),
    //         );
    //       }}
    //     />
    //   ),
    // },
    // {
    //   label: "จุดสิ้นสุด",
    //   render: (v: Vehicle) => (
    //     <LocationInput
    //       inputId={`end-location-${v.id}`}
    //       value={v.endLocation}
    //       color="var(--p-1000)"
    //       fontSize="0.875rem"
    //       onChange={(location) => {
    //         setVehicleData((prev) =>
    //           prev.map((item) =>
    //             item.id === v.id
    //               ? {
    //                   ...item,
    //                   endLocation: location,
    //                 }
    //               : item,
    //           ),
    //         );
    //       }}
    //     />
    //   ),
    // },
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
        <UploadStepper
          title="นำเข้าข้อมูลยานพาหนะ"
          file={file}
          setFile={setFile}
          mappedColData={mappedColData}
          setMappedColData={setMappedColData}
          headerRule={headerRule}
          handleCreate={() => setIsUpload(false)}
          onClose={() => setIsUpload(false)}
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
