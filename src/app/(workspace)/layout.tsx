import { Topbar } from "@/components/navigation/Topbar/Topbar";
import { ReactNode } from "react";
import styles from "./workspace.module.scss";
import { Sidebar } from "@/components/navigation/Sidebar/Sidebar";
const PlanLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.sidebarWrapper}>
      {/* <Sidebar /> */}
      <div className={styles.body}>
        <Topbar></Topbar>
        {children}
      </div>
    </div>
  );
};

export default PlanLayout;
