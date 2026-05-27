import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./StepperControl.module.scss";
import IconSvgMono from "@/components/Icon/SvgIcon";
import { FloatingCard } from "../FloatingCard/FloatingCard";
import { StepperControlProps, StepperProp } from "./StepperControl.types";
const GAP_PX = 24;

export const StepperControl = ({
  fontSize = "0.875rem",
  stepper,
  value,
}: StepperControlProps) => {
  const [internalActive, setInternalActive] = useState(1);
  const [visible, setVisible] = useState<StepperProp[]>(stepper);
  const [hidden, setHidden] = useState<StepperProp[]>([]);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLButtonElement>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  const active = value ?? internalActive;

  const updateTabs = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const computedStyle = getComputedStyle(el);
    const paddingLeft = parseFloat(computedStyle.paddingLeft);
    const paddingRight = parseFloat(computedStyle.paddingRight);
    const containerWidth = el.clientWidth - paddingLeft - paddingRight;

    const moreWidth = (moreRef.current?.offsetWidth ?? 0) + GAP_PX;

    let used = 0;
    let cutIndex = stepper.length;

    for (let i = 0; i < stepper.length; i++) {
      const tabEl = tabRefs.current[i];
      if (!tabEl) continue;

      const tabWidth = tabEl.offsetWidth + GAP_PX;
      const isLast = i === stepper.length - 1;
      const reserve = !isLast ? moreWidth : 0;

      if (used + tabWidth + reserve > containerWidth) {
        cutIndex = i;
        break;
      }

      used += tabWidth;
    }

    setVisible(stepper.slice(0, cutIndex));
    setHidden(stepper.slice(cutIndex));
  }, [stepper]);

  return (
    <div className={styles.container} ref={containerRef}>
      {stepper.map((item, i) => (
        <div
          key={item.value}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          className={[
            styles.item,
            active === item.value ? styles.active : "",
            visible.includes(item) ? "" : styles.hiddenTab,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles.icon}>
            <h4>{item.value + 1}</h4>
          </div>
          <h4 className={styles.label} style={{ fontSize: fontSize }}>
            {item.label}
          </h4>
        </div>
      ))}
    </div>
  );
};
