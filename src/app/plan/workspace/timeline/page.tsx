"use client";

import { TimePeriod } from "@/types/api.types";
import { useState } from "react";
import styles from "./timeline.module.scss";
import React from "react";

const vehicles = [
  {
    name: "V-02",
    // พักเที่ยง 12:00 - 13:00 (720 - 780 นาที)
    breaktime: [720, 780],
    route: [
      {
        loc: ["16.4442, 102.8352"],
        prio: "Depot",
        arrivalTime: 480,
        serviceTime: 0,
      }, // เริ่มที่ Depot 08:00
      {
        loc: ["16.418724, 102.832380"],
        prio: "High",
        arrivalTime: 510,
        serviceTime: 10,
      },
      {
        loc: ["16.426529, 102.828486"],
        prio: "Low",
        arrivalTime: 540,
        serviceTime: 15,
      },
      {
        loc: ["16.448285, 102.833536"],
        prio: "Medium",
        arrivalTime: 570,
        serviceTime: 12,
      },
      {
        loc: ["16.431222, 102.832606"],
        prio: "Critical",
        arrivalTime: 600,
        serviceTime: 5,
      },
      {
        loc: ["16.457895, 102.845722"],
        prio: "Medium",
        arrivalTime: 630,
        serviceTime: 10,
      },
      {
        loc: ["16.435022, 102.836030"],
        prio: "Medium",
        arrivalTime: 660,
        serviceTime: 10,
      },
      {
        loc: ["16.426499, 102.839821"],
        prio: "Medium",
        arrivalTime: 690,
        serviceTime: 10,
      },
      // ช่วงพัก 720-780 จะแทรกอยู่ตรงนี้ตาม Logic การเดินรถจริง
      {
        loc: ["16.436883, 102.838487"],
        prio: "High",
        arrivalTime: 800,
        serviceTime: 20,
      },
      {
        loc: ["16.491586, 102.832824"],
        prio: "Medium",
        arrivalTime: 840,
        serviceTime: 15,
      },
      {
        loc: ["16.440155, 102.829593"],
        prio: "Medium",
        arrivalTime: 880,
        serviceTime: 10,
      },
      {
        loc: ["16.4442, 102.8352"],
        prio: "Depot",
        arrivalTime: 920,
        serviceTime: 0,
      },
    ],
  },
  {
    name: "V-09",
    breaktime: [720, 780],
    route: [
      {
        loc: ["16.4442, 102.8352"],
        prio: "Depot",
        arrivalTime: 480,
        serviceTime: 0,
      },
      {
        loc: ["16.465963, 102.825539"],
        prio: "Medium",
        arrivalTime: 520,
        serviceTime: 15,
      },
      {
        loc: ["16.460546, 102.826129"],
        prio: "High",
        arrivalTime: 550,
        serviceTime: 10,
      },
      {
        loc: ["16.428000, 102.833915"],
        prio: "Critical",
        arrivalTime: 590,
        serviceTime: 5,
      },
      {
        loc: ["16.452426, 102.795862"],
        prio: "High",
        arrivalTime: 640,
        serviceTime: 20,
      },
      {
        loc: ["16.446586, 102.823942"],
        prio: "Low",
        arrivalTime: 680,
        serviceTime: 15,
      },
      {
        loc: ["16.480622, 102.818632"],
        prio: "Medium",
        arrivalTime: 790,
        serviceTime: 10,
      },
      {
        loc: ["16.463575, 102.827698"],
        prio: "High",
        arrivalTime: 820,
        serviceTime: 12,
      },
      {
        loc: ["16.468967, 102.829573"],
        prio: "Low",
        arrivalTime: 850,
        serviceTime: 10,
      },
      {
        loc: ["16.480634, 102.868522"],
        prio: "Low",
        arrivalTime: 900,
        serviceTime: 15,
      },
      {
        loc: ["16.453110, 102.832916"],
        prio: "Low",
        arrivalTime: 940,
        serviceTime: 8,
      },
      {
        loc: ["16.4442, 102.8352"],
        prio: "Depot",
        arrivalTime: 980,
        serviceTime: 0,
      },
    ],
  },
  {
    name: "V-11",
    breaktime: [720, 780],
    route: [
      {
        loc: ["16.4442, 102.8352"],
        prio: "Depot",
        arrivalTime: 480,
        serviceTime: 0,
      },
      {
        loc: ["16.489513, 102.818906"],
        prio: "Low",
        arrivalTime: 515,
        serviceTime: 30,
      },
      {
        loc: ["16.485946, 102.843109"],
        prio: "Medium",
        arrivalTime: 560,
        serviceTime: 20,
      },
      {
        loc: ["16.448274, 102.834671"],
        prio: "Critical",
        arrivalTime: 600,
        serviceTime: 12,
      },
      {
        loc: ["16.480198, 102.815845"],
        prio: "Critical",
        arrivalTime: 630,
        serviceTime: 5,
      },
      {
        loc: ["16.477720, 102.856120"],
        prio: "Low",
        arrivalTime: 670,
        serviceTime: 10,
      },
      {
        loc: ["16.486826, 102.816038"],
        prio: "Medium",
        arrivalTime: 700,
        serviceTime: 12,
      },
      {
        loc: ["16.474315, 102.859931"],
        prio: "Low",
        arrivalTime: 800,
        serviceTime: 15,
      },
      {
        loc: ["16.480415, 102.811911"],
        prio: "High",
        arrivalTime: 840,
        serviceTime: 15,
      },
      {
        loc: ["16.482446, 102.820245"],
        prio: "Medium",
        arrivalTime: 880,
        serviceTime: 8,
      },
      {
        loc: ["16.478216, 102.819988"],
        prio: "Low",
        arrivalTime: 910,
        serviceTime: 25,
      },
      {
        loc: ["16.4442, 102.8352"],
        prio: "Depot",
        arrivalTime: 960,
        serviceTime: 0,
      },
    ],
  },
];
const COLWIDTH = 12;
const TimeLine = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>({
    start: 0,
    end: 23,
  });
  const [timeScale, setTImeScale] = useState(10);
  const totalHours = timePeriod.end - timePeriod.start + 1;
  const totalWidth = totalHours * COLWIDTH;
  return (
    <div className={styles.timeline}>
      {/* ===========================
        Vehicle Name column | First Row 
        ===========================
      */}

      <div className={styles.vehicleCol}>
        <div className={styles.vehicleHeader}>
          <h3>ยานพาหนะ</h3>
        </div>
        {vehicles.map((v, idx) => (
          <div className={styles.vehicleName} key={idx}>
            <p>{v.name}</p>
          </div>
        ))}
      </div>

      {/* ===========================
        Dynamic Hour Header
        ===========================
      */}
      <div className={styles.srcollArea}>
        <div
          className={styles.Header}
          style={
            {
              "--col-width": COLWIDTH,
              "--grid-col": 60 / timeScale,
            } as React.CSSProperties
          }
        >
          {[...Array(timePeriod.end - timePeriod.start + 1)].map((_, index) => {
            const hour = index + timePeriod.start;
            return (
              <div className={styles.mainHeader} key={"hour:" + hour}>
                <h2 className={styles.text}>
                  {hour.toString().padStart(2, "0")}
                </h2>
                <div className={styles.subHeader}>
                  {[...Array(60 / timeScale)].map((_, inm) => {
                    return (
                      <div className={styles.tick} key={"minute:" + inm}>
                        {inm}0
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={styles.bar}
          style={
            {
              "--total-width": totalWidth,
            } as React.CSSProperties
          }
        >
          {vehicles.map((v, idx) => (
            <div className={styles.barTimeline} key={idx}>
              {v.route.map((t, idt) => (
                <div
                  className={styles.barOrder}
                  style={
                    {
                      width: `${(t.serviceTime / timeScale) * (COLWIDTH / (50 / timeScale))}rem`,
                      "--bar-position": `${(t.arrivalTime / 60) * COLWIDTH}rem`,
                    } as React.CSSProperties
                  }
                >
                  {t.arrivalTime}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
