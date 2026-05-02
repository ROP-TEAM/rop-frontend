"use client";

import { useState } from "react";
import styles from "./map.module.scss";

const MapWorkspace = () => {
  const [manageState, setManageState] = useState<"vehicle" | "order">(
    "vehicle",
  );
  return (
    <div className={styles.map}>
      <div className={styles.management}>
        <div className={styles.header}>
          <h3>รอบรถวันสงกรานต์</h3>
        </div>
        <div className={styles.stateControl}>
          <p>ยานพาหนะ</p>
          <p>ออเดอร์</p>
        </div>
      </div>
    </div>
  );
};

export default MapWorkspace;
