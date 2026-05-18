"use client";

import styles from "./page.module.scss";
import { SkillPill } from "@/components/ui/SkillPill/SkillPill";
import { Vehicle } from "@/types/api.types";
import { useCallback, useEffect, useRef, useState } from "react";

const colorList: string[] = [
  "#F87171",
  "#FB923C",
  "#FACC15",
  "#4ADE80",
  "#22D3EE",
  "#60A5FA",
  "#A78BFA",
  "#F472B6",
  "#FCA5A5",
  "#FDBA74",
  "#FDE047",
  "#86EFAC",
  "#67E8F9",
  "#93C5FD",
  "#C4B5FD",
  "#F9A8D4",
];

const getSkillColor = (id: number) => colorList[id % colorList.length];

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
      { id: 1, name: "ห้องเย็น", color: getSkillColor(1) },
      { id: 3, name: "GPS Tracking", color: getSkillColor(3) },
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
    skills: [{ id: 2, name: "ขนส่งด่วน", color: getSkillColor(2) }],
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
      { id: 1, name: "ห้องเย็น", color: getSkillColor(1) },
      { id: 4, name: "ขนส่งสารเคมี", color: getSkillColor(4) },
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
    skills: [{ id: 4, name: "ขนส่งสารเคมี", color: getSkillColor(4) }],
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
      { id: 5, name: "ควบคุมอุณหภูมิ", color: getSkillColor(5) },
      { id: 3, name: "GPS Tracking", color: getSkillColor(3) },
    ],
  },
];

const formatTime = (hhmm: number) => {
  const h = Math.floor(hhmm / 100)
    .toString()
    .padStart(2, "0");
  const m = (hhmm % 100).toString().padStart(2, "0");
  return `${h}:${m}`;
};

const columns = [
  { label: "ชื่อรถ", render: (v: Vehicle) => v.name },
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
        {v.numberPlate || "-"}
      </div>
    ),
  },
  { label: "ความจุน้ำหนัก", render: (v: Vehicle) => `${v.maxCapacity} ตัน` },
  {
    label: "ความสามารถเฉพาะ",
    render: (v: Vehicle) => (
      <div className={styles.skillsWrapper}>
        {v.skills?.map((s) => (
          <SkillPill key={s.id} title={s.name} color={s.color} />
        ))}
      </div>
    ),
  },
  {
    label: "เวลาเริ่มเดินรถ",
    render: (v: Vehicle) => `${formatTime(v.workTime.start)} น.`,
  },
  {
    label: "เวลาสิ้นสุดเดินรถ",
    render: (v: Vehicle) => `${formatTime(v.workTime.end)} น.`,
  },
  {
    label: "เวลาเริ่มพัก",
    render: (v: Vehicle) => `${formatTime(v.breakTime.start)} น.`,
  },
  {
    label: "เวลาสิ้นสุดพัก",
    render: (v: Vehicle) => `${formatTime(v.breakTime.end)} น.`,
  },
  {
    label: "จุดเริ่มต้น",
    render: (v: Vehicle) => (
      <span className={styles.coordinate}>
        {v.startLocation.lat},{v.startLocation.lng}
      </span>
    ),
  },
  {
    label: "จุดสิ้นสุด",
    render: (v: Vehicle) => (
      <span className={styles.coordinate}>
        {v.endLocation.lat},{v.endLocation.lng}
      </span>
    ),
  },
];

const VehiclePage = ({ vehicles = mockVehicles }: { vehicles: Vehicle[] }) => {
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
          {vehicles.map((v, row) => (
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
  );
};
export default VehiclePage;
