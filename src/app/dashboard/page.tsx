"use client";
import { useState } from "react";
import { Topbar } from "@/components/navigation/Topbar/Topbar";
import styles from "./dashboard.module.scss";
import { SkillPill } from "@/components/ui/SkillPill/SkillPill";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// ---------- ข้อมูลจริง ----------
const actualDrugData = [
  { name: "Insulin\nglargine", value: 1950 },
  { name: "Trastuzumab", value: 2650 },
  { name: "Infliximab", value: 1400 },
  { name: "Latanoprost", value: 1800 },
  { name: "Filgrastim", value: 700 },
  { name: "Darbepoetin\nalfa", value: 2300 },
  { name: "Epoetin alfa", value: 450 },
  { name: "Latanoprost", value: 1350 },
];

const actualVehicleData = [
  { name: "รถขนทำความเย็น", value: 4, color: "#4C79E4" },
  { name: "รถบรรทุก 6 ล้อ", value: 4, color: "#2E7D32" },
  { name: "รถทั่วไป", value: 1, color: "#D9A441" },
];

const actualHospitalData = [
  {
    hospital: "โรงพยาบาลบางกอกน้อย",
    drugs: "Amoxicillin, Ceftriaxone, Amlodipine",
    weight: "153 kg",
    distance: "42 km",
    routeType: "รถทั่วไป",
    routeColor: "#b8eb33",
    priority: "สูง",
    priorityColor: "red",
    eta: "10",
  },
  {
    hospital: "โรงพยาบาลกรุงเทพ",
    drugs: "Amoxicillin, Ceftriaxone, Amlodipine",
    weight: "258 kg",
    distance: "95 km",
    routeType: "รถทั่วไป",
    routeColor: "#1868db",
    priority: "ต่ำ",
    priorityColor: "green",
    eta: "40",
  },
  {
    hospital: "โรงพยาบาลทุ่งหลองแวง",
    drugs: "Amoxicillin, Ceftriaxone, Amlodipine",
    weight: "175 kg",
    distance: "108 km",
    routeType: "รถทั่วไป",
    routeColor: "#b8eb33",
    priority: "สูง",
    priorityColor: "red",
    eta: "45",
  },
  {
    hospital: "โรงพยาบาลศรีนครินทร์",
    drugs: "Amoxicillin, Ceftriaxone, Amlodipine",
    weight: "210 kg",
    distance: "63 km",
    routeType: "รถทั่วไป",
    routeColor: "#1868db",
    priority: "ปานกลาง",
    priorityColor: "orange",
    eta: "25",
  },
  {
    hospital: "โรงพยาบาลขอนแก่น",
    drugs: "Amoxicillin, Ceftriaxone, Amlodipine",
    weight: "132 kg",
    distance: "30 km",
    routeType: "รถทั่วไป",
    routeColor: "#1868db",
    priority: "ต่ำ",
    priorityColor: "green",
    eta: "12",
  },
];

const actualCards = {
  totalWeight: "8960 kg",
  weightDiff: "^ 16.3% จากรอบจัดส่งรอบก่อน",
  vehicleCount: "13",
  vehicleBreakdown: "4 รถทำความเย็น - 4 รถบรรทุกหกล้อ - 1 รถทั่วไป",
  accuracy: "96.7%",
  accuracyNote: "อ้างอิงจากการทำนาย 10 สัปดาห์ย้อนหลัง",
  riskHospitals: "20 โรงบาล",
};

// ---------- ข้อมูลคาดการณ์ (mock) ----------
const forecastDrugData = [
  { name: "Insulin\nglargine", value: 2100 },
  { name: "Trastuzumab", value: 2900 },
  { name: "Infliximab", value: 1500 },
  { name: "Latanoprost", value: 1650 },
  { name: "Filgrastim", value: 850 },
  { name: "Darbepoetin\nalfa", value: 2500 },
  { name: "Epoetin alfa", value: 520 },
  { name: "Latanoprost", value: 1420 },
];

const forecastVehicleData = [
  { name: "รถขนทำความเย็น", value: 5, color: "#4C79E4" },
  { name: "รถบรรทุก 6 ล้อ", value: 5, color: "#2E7D32" },
  { name: "รถทั่วไป", value: 2, color: "#D9A441" },
];

const forecastHospitalData = [
  {
    hospital: "โรงพยาบาลบางกอกน้อย",
    drugs: "Amoxicillin, Ceftriaxone, Amlodipine",
    weight: "168 kg",
    distance: "42 km",
    routeType: "รถทั่วไป",
    routeColor: "#b8eb33",
    priority: "สูง",
    priorityColor: "red",
    eta: "11",
  },
  {
    hospital: "โรงพยาบาลกรุงเทพ",
    drugs: "Amoxicillin, Ceftriaxone, Amlodipine",
    weight: "270 kg",
    distance: "95 km",
    routeType: "รถทั่วไป",
    routeColor: "#1868db",
    priority: "ปานกลาง",
    priorityColor: "orange",
    eta: "42",
  },
  {
    hospital: "โรงพยาบาลทุ่งหลองแวง",
    drugs: "Amoxicillin, Ceftriaxone, Amlodipine",
    weight: "190 kg",
    distance: "108 km",
    routeType: "รถทั่วไป",
    routeColor: "#b8eb33",
    priority: "สูง",
    priorityColor: "red",
    eta: "48",
  },
  {
    hospital: "โรงพยาบาลศรีนครินทร์",
    drugs: "Amoxicillin, Ceftriaxone, Amlodipine",
    weight: "225 kg",
    distance: "63 km",
    routeType: "รถทั่วไป",
    routeColor: "#1868db",
    priority: "ปานกลาง",
    priorityColor: "orange",
    eta: "27",
  },
  {
    hospital: "โรงพยาบาลขอนแก่น",
    drugs: "Amoxicillin, Ceftriaxone, Amlodipine",
    weight: "140 kg",
    distance: "30 km",
    routeType: "รถทั่วไป",
    routeColor: "#1868db",
    priority: "ต่ำ",
    priorityColor: "green",
    eta: "13",
  },
];

const forecastCards = {
  totalWeight: "9450 kg",
  weightDiff: "^ 5.5% จากที่คาดการณ์ครั้งก่อน",
  vehicleCount: "16",
  vehicleBreakdown: "5 รถทำความเย็น - 5 รถบรรทุกหกล้อ - 2 รถทั่วไป",
  accuracy: "91.2%",
  accuracyNote: "อ้างอิงจากการทำนาย 10 สัปดาห์ย้อนหลัง",
  riskHospitals: "26 โรงบาล",
};

type ViewMode = "actual" | "forecast";

const Dashboard = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("actual");

  const isActual = viewMode === "actual";

  const drugData = isActual ? actualDrugData : forecastDrugData;
  const vehicleData = isActual ? actualVehicleData : forecastVehicleData;
  const hospitalData = isActual ? actualHospitalData : forecastHospitalData;
  const cards = isActual ? actualCards : forecastCards;

  return (
    <div>
      <Topbar></Topbar>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div>
            <h1>รายการจ่ายยาและเวชภัณฑ์</h1>
            <p>
              สามารถสลับสถานะการแสดงผลเพื่อดูข้อมูลปัจจุบันและข้อมูลที่ระบบคาดการณ์ว่าจะเกิดขึ้น
            </p>
          </div>
          <div className={styles.toggle}>
            <button
              className={isActual ? styles.active : styles.inactive}
              onClick={() => setViewMode("actual")}
            >
              <span>• </span>ข้อมูลจริง
            </button>
            <button
              className={!isActual ? styles.active : styles.inactive}
              onClick={() => setViewMode("forecast")}
            >
              <span>• </span>คาดการณ์
            </button>
          </div>
        </div>
        <div>
          <div className={styles.info}>
            <p className={isActual ? styles.infoBox : styles.predictBox}>
              {isActual ? "ข้อมูล Dashboard • รอบส่งล่าสุด" : "ผลคาดการณ์ • รอบส่งถัดไป"}
            </p>
            <p>
              {isActual
                ? "ข้อมูลจริงจากรอบส่งล่าสุด"
                : "คาดการณ์โดย AI จากข้อมูลที่มี - ยังไม่ยืนยัน"}
            </p>
          </div>
          <div className={styles.cards}>
            <div className={isActual ? styles.card : styles.predictCard}>
              <p>จำนวนยาที่ต้องจัดส่ง</p>
              <p className={styles.number}>{cards.totalWeight}</p>
              <p>{cards.weightDiff}</p>
            </div>
            <div className={isActual ? styles.card : styles.predictCard}>
              <p>รถที่ต้องการสำหรับการจัดส่ง</p>
              <p className={styles.number}>{cards.vehicleCount}</p>
              <p>{cards.vehicleBreakdown}</p>
            </div>
            <div className={isActual ? styles.card : styles.predictCard}>
              <p>ใกล้เคียงผลลัพธ์จากการทำนาย</p>
              <p className={styles.percent}>{cards.accuracy}</p>
              <p>{cards.accuracyNote}</p>
            </div>
            <div className={isActual ? styles.card : styles.predictCard}>
              <p>โรงบาลที่มีความเสี่ยงยาหมดก่อนกำหนด</p>
              <p className={styles.number}>{cards.riskHospitals}</p>
              <p>ก่อนที่รอบส่งจะมาถึง</p>
            </div>
          </div>
        </div>

        <div className={styles.charts}>
          <div className={styles.chartCard}>
            <p className={styles.chartTitle}>ปริมาณยาที่หมุนเวียนในโรงบาล</p>
            <p className={styles.chartSubtitle}>
              คำนวณโดยใช้หน่วยกิโลกรัมต่อรอบ ในการจัดส่งรอบหน้า
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={drugData}
                margin={{ top: 10, right: 80, left: 0, bottom: 0 }}
              >
                <CartesianGrid vertical={false} stroke="#eee" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                {isActual ? <Bar dataKey="value" fill="#4C79E4" /> : <Bar dataKey="value" fill="#D9A441" />}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartCard}>
            <p className={styles.chartTitle}>รถที่ใช้งานในการจัดส่ง</p>
            <p className={styles.chartSubtitle}>
              คำนวณโดยใช้หน่วยกิโลกรัมต่อรอบ ในการจัดส่งรอบหน้า
            </p>
            <div className={styles.donutWrapper}>
              <ul className={styles.legend}>
                {vehicleData.map((item) => (
                  <li key={item.name}>
                    <span
                      className={styles.dot}
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name}
                  </li>
                ))}
              </ul>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={vehicleData}
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {vehicleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className={styles.tableCard}>
          <p className={styles.chartTitle}>
            รายการจ่ายยาและเวชภัณฑ์ - {isActual ? "ข้อมูลจริง" : "คาดการณ์"}
          </p>
          <p className={styles.chartSubtitle}>
            {isActual
              ? "รายการที่แสดง เป็นข้อมูลจริงจากรอบส่งล่าสุด"
              : "รายการที่แสดง เป็นเพียงรายการที่ทำนายขึ้นมา โปรดตรวจสอบความถูกต้องก่อนการจัดรอบรถ"}
          </p>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>โรงบาล</th>
                <th>น้ำหนักรวม</th>
                <th>ระยะทาง</th>
                <th>ลักษณะเฉพาะ</th>
                <th>ความสำคัญ</th>
                <th>เวลาจัดเตรียม(นาที)</th>
              </tr>
            </thead>
            <tbody>
              {hospitalData.map((row) => (
                <tr key={row.hospital}>
                  <td>
                    <p className={styles.hospitalName}>{row.hospital}</p>
                    <p className={styles.hospitalDrugs}>{row.drugs}</p>
                  </td>
                  <td>{row.weight}</td>
                  <td>{row.distance}</td>
                  <td>
                    <SkillPill title={row.routeType} color={row.routeColor} />
                  </td>
                  <td>
                    <span
                      className={`${styles.priority} ${styles[row.priorityColor]}`}
                    >
                      {row.priority}
                    </span>
                  </td>
                  <td>{row.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;