"use client";
import { Topbar } from "@/components/navigation/Topbar/Topbar";
import { ReactNode, useState } from "react";
import styles from "./plan.module.scss";
import { Sidebar } from "@/components/navigation/Sidebar/Sidebar";
import { DetailCard } from "@/components/ui/DetailCard/DetailCard";
import { useSelector } from "react-redux";
import { RootState } from "../store";
const PlanLayout = ({ children }: { children: ReactNode }) => {
  const sidePopupSlice = useSelector((state: RootState) => state.sidePopup);
  return (
    <div className={styles.sidebarWrapper}>
      {sidePopupSlice.isShowControl && <Sidebar />}
      <div className={styles.topbarWarpper}>
        <Topbar></Topbar>
        <div className={styles.body}>
          {children}
          {sidePopupSlice.isShowDetail && sidePopupSlice.isShowControl && (
            <div>
              <DetailCard></DetailCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanLayout;
