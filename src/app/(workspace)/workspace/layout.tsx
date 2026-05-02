"use client";
import { Topbar } from "@/components/navigation/Topbar/Topbar";
import styles from "./workspace.module.scss";
import { SegmentControl } from "@/components/ui/SegmentControl/SegmentControl";
import { SegmentProp } from "@/components/ui/SegmentControl/SegmentControl.types";
import { usePathname } from "next/navigation";
import { UseDispatch, useSelector } from "react-redux";
import { ReactNode } from "react";
import { RootState } from "@/app/store";
const WorkSpaceLayout = ({ children }: { children: ReactNode }) => {
  const isShow = useSelector(
    (state: RootState) => state.sidePopupReducer.isShow,
  );
  const pathname = usePathname().split("/")[2];
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
    <div>
      <div className={styles.layout}>
        <section className={styles.space}>
          <p>{pathname}</p>
          <SegmentControl value={pathname} segments={segments}></SegmentControl>
          <div className={styles.space}>{children}</div>
        </section>
        {isShow && (
          <section className={styles.popup}>
            <div className={styles.popup}>Hello</div>
          </section>
        )}
      </div>
    </div>
  );
};
export default WorkSpaceLayout;
