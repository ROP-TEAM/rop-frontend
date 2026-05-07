"use client";
import { Topbar } from "@/components/navigation/Topbar/Topbar";
import styles from "./workspace.module.scss";
import { SegmentControl } from "@/components/ui/SegmentControl/SegmentControl";
import { SegmentProp } from "@/components/ui/SegmentControl/SegmentControl.types";
import { usePathname } from "next/navigation";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { ReactNode, useState } from "react";
import { TextInput } from "@/components/form/TextInput/TextInput";
import { RootState } from "@/app/store";
const WorkSpaceLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname().split("/")[3];
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState<string>("โปรเจคไม่ทราบชื่อ");
  const segments: SegmentProp[] = [
    {
      icon: "/icon/car.svg",
      value: "vehicle",
      label: "ยานพาหนะ",
    },
    {
      icon: "/icon/order.svg",
      value: "order",
      label: "ออเดอร์",
    },
    {
      icon: "/icon/card.svg",
      value: "board",
      label: "การ์ด",
    },
    {
      icon: "/icon/timeline.svg",
      value: "plan",
      label: "แผนเดินรถ",
    },
  ];
  return (
    <div className={styles.layout}>
      <section className={styles.space}>
        <div className={styles.headerText}>
          {/* <p>พื้นที่จัดการ</p> */}
          <div>
            <TextInput
              label="พื้นที่จัดการ"
              labelSize="0.725rem"
              labelColor="var(--p-500)"
              color="var(--p-800)"
              value={projectName}
              fontWeight="500"
              onChange={setProjectName}
              width="12rem"
            ></TextInput>
          </div>
        </div>
        <SegmentControl value={pathname} segments={segments}></SegmentControl>
        <div className={styles.children}>{children}</div>
      </section>
    </div>
  );
};
export default WorkSpaceLayout;
