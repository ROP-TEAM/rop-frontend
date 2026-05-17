"use client";

import { useEffect, useState } from "react";
import { PreviewTableProps } from "./types";
import styles from "./page.module.scss";
import { SkillPill } from "@/components/ui/SkillPill/SkillPill";

const Vehicle = ({colData = [],
  tableInfo = [],}: PreviewTableProps) => {
  // const [csv, setCsv] = useState<string[][]>([]);
  // const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     const text = event.target?.result as string;
  //     const rows = text.split("\n").map((row) => row.split(","));
  //     setCsv(rows);
  //   };
  //   reader.readAsText(file);
  // };
  // useEffect(() => {
  //   console.log(csv);
  // }, [csv]);
  const mockData: PreviewTableProps = {
  colData: [
    [
      "Truck Alpha",
      "81-1234",
      "12 ตัน",
      "ห้องเย็น",
      "08:00 - 18:00",
      "12:00 - 13:00",
      "16.1479,17.1578", "16.2479,17.2578",
    ],
    [
      "Truck Beta",
      "72-4589",
      "17 ตัน",
      "ขนส่งด่วน",
      "06:30 - 16:30",
      "11:30 - 12:00",
      "16.3479,17.4578", "16.4479,17.5578",
    ],
    [
      "Truck Gamma",
      "94-7711",
      "15 ตัน",
      "GPS Tracking",
      "09:00 - 20:00",
      "14:00 - 15:00",
      "16.5479,17.6578", "16.6479,17.7578",
    ],
    [
      "Truck Delta",
      "53-9902",
      "10 ตัน",
      "ขนส่งสารเคมี",
      "07:00 - 17:00",
      "12:30 - 13:30",
      "16.7479,17.8578", "16.8479,17.9578",
    ],
    [
      "Truck Omega",
      "11-6428",
      "50 ตัน",
      "ควบคุมอุณหภูมิ",
      "10:00 - 19:00",
      "15:00 - 15:30",
      "16.9479,18.0578", "17.0479,18.1578",
    ],
  ],

  tableInfo: [
    { fileCol: 0, label: "ชื่อรถ", errorRows: [] },
    { fileCol: 1, label: "หมายเลขทะเบียน", errorRows: [] },
    { fileCol: 2, label: "ความจุน้ำหนัก", errorRows: [] },
    { fileCol: 3, label: "ความสามารถเฉพาะ", errorRows: [] },
    { fileCol: 4, label: "เวลาเดินรถ", errorRows: [] },
    { fileCol: 5, label: "เวลาพัก", errorRows: [] },
    { fileCol: 6, label: "จุดเริ่มต้น", errorRows: [] },
    { fileCol: 7, label: "จุดสิ้นสุด", errorRows: [] },
  ],
};

  const coordinateCols = ["จุดเริ่มต้น", "จุดสิ้นสุด"];
  return (
    <div className={styles.wrapper}>
      {/* <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        placeholder="File here"
      />
      {csv[0]?.map((c, index) => (
        <div key={index} style={{ color: "red", border: "1px solid" }}>
          [{c}]
        </div>
      ))} */}
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th></th>
            {mockData.tableInfo.map((col) => (
              <th key={col.fileCol}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
        {mockData.colData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>{rowIndex + 1}</td>
            {mockData.tableInfo.map((col) => (
              <td key={col.fileCol}
              className={coordinateCols.includes(col.label) ? styles.coordinate : ""}
              >
                {row[col.fileCol]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>

      </table>
    </div>
  );
};
export default Vehicle;
