"use client";

import { TimePeriod } from "@/types/api.types";
import { useState } from "react";
import styles from "./timeline.module.scss";
import React from "react";
const TimeLine = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>({
    start: 9,
    end: 21,
  });
  const [timeScale, setTImeScale] = useState(10);
  return (
    <div className={styles.timeline}>
      {/* ===========================
        Vehicle Name column | First Row 
        ===========================
      */}

      <div></div>

      {/* ===========================
        Dynamic Hour Header
        ===========================
      */}

      <div className={styles.mainHeader}>
        {[...Array(timePeriod.end - timePeriod.start + 1)].map((_, index) => {
          const hour = index + timePeriod.start;
          return (
            <div key={"hour:" + hour}>
              <h2>{hour.toString().padStart(2, "0")}</h2>
              <div className={styles.subHeader}>
                {[...Array(60 / timeScale)].map((_, inm) => {
                  return <div key={"minute:" + inm}>{inm}0</div>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeLine;
