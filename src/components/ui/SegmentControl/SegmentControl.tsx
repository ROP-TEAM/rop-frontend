import { useState } from "react";
import styles from "./SegmentControl.module.scss";
import IconSvgMono from "@/components/Icon/SvgIcon";

export const SegmentControl = ({
  segments,
  value,
  onChange,
}: SegmentControlProps) => {
  const [internalActive, setInternalActive] = useState(
    segments[0]?.value ?? "",
  );

  const active = value ?? internalActive;

  const handleClick = (item: SegmentProp) => {
    if (!value) setInternalActive(item.value);
    onChange?.(item.value);
    item.onClick?.();
  };
  return (
    <div className={styles.container}>
      {segments.map((item) => (
        <div
          key={item.value}
          onClick={() => handleClick(item)}
          className={`${styles.item} ${active === item.value ? styles.active : ""}`}
        >
          <IconSvgMono src={item.icon} size={20} className={styles.icon} />
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
};
