"use client";

import { useState } from "react";
import styles from "./map.module.scss";
import { VehicleCard } from "./Component/VehicleCard/VehicleCard";
const MapWorkspace = () => {
  const [manageState, setManageState] = useState<"vehicle" | "order">(
    "vehicle",
  );
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  return (
    <div className={styles.map}>
      {isShowSidebar && (
        <div className={styles.management}>
          <div className={styles.header}>
            <h3>รอบรถวันสงกรานต์</h3>
          </div>
          <div className={styles.stateControl}>
            <button type="button">ยานพาหนะ</button>
            <button type="button">ออเดอร์</button>
          </div>
          <div className={styles.vehicleContainer}>
            <VehicleCard></VehicleCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapWorkspace;
