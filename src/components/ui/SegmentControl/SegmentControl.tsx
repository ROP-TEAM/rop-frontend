import { useState } from "react";
import styles from "./SegmentControl.module.scss";
import IconSvgMono from "@/components/Icon/SvgIcon";

export const SegmentControl = () => {
  const segments: SegmentProp[] = [
    { value: "ยานพาหนะ", label: "ยานพาหนะ", icon: "/icon/car.svg" },
    { value: "ออเดอร์", label: "ออเดอร์", icon: "/icon/order.svg" },
    { value: "การ์ด", label: "การ์ด", icon: "/icon/card.svg" },
    { value: "ไทม์ไลน์", label: "ไทม์ไลน์", icon: "/icon/timeline.svg" },
  ];

  const [active, setActive] = useState("ยานพาหนะ");
  return (
    <div className={styles.container}>
      {segments.map((item) => (
        <div
          key={item.value}
          onClick={() => setActive(item.value)}
          className={`${styles.item} ${active === item.value ? styles.active : ""}`}
        >
          <IconSvgMono src={item.icon} size={20} className={styles.icon} />
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
};
