import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SegmentControl.module.scss";
import IconSvgMono from "@/components/Icon/SvgIcon";
import { FloatingCard } from "../FloatingCard/FloatingCard";
import { SegmentControlProps, SegmentProp } from "./SegmentControl.types";
const GAP_PX = 24;

export const SegmentControl = ({
  fontSize = "0.875rem",
  segments,
  value,
  onChange,
}: SegmentControlProps) => {
  const [internalActive, setInternalActive] = useState(
    segments[0]?.value ?? "",
  );
  const [visible, setVisible] = useState<SegmentProp[]>(segments);
  const [hidden, setHidden] = useState<SegmentProp[]>([]);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLButtonElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = value ?? internalActive;

  const handleClick = (item: SegmentProp) => {
    if (!value) setInternalActive(item.value);
    onChange?.(item.value);
    item.onClick?.();
  };

  const updateTabs = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const computedStyle = getComputedStyle(el);
    const paddingLeft = parseFloat(computedStyle.paddingLeft);
    const paddingRight = parseFloat(computedStyle.paddingRight);
    const containerWidth = el.clientWidth - paddingLeft - paddingRight;

    const moreWidth = (moreRef.current?.offsetWidth ?? 0) + GAP_PX;

    let used = 0;
    let cutIndex = segments.length;

    for (let i = 0; i < segments.length; i++) {
      const tabEl = tabRefs.current[i];
      if (!tabEl) continue;

      const tabWidth = tabEl.offsetWidth + GAP_PX;
      const isLast = i === segments.length - 1;
      const reserve = !isLast ? moreWidth : 0;

      if (used + tabWidth + reserve > containerWidth) {
        cutIndex = i;
        break;
      }

      used += tabWidth;
    }

    setVisible(segments.slice(0, cutIndex));
    setHidden(segments.slice(cutIndex));
  }, [segments]);

  useEffect(() => {
    const frame = requestAnimationFrame(updateTabs);
    return () => cancelAnimationFrame(frame);
  }, [updateTabs]);

  useEffect(() => {
    const observer = new ResizeObserver(updateTabs);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [updateTabs]);

  return (
    <div className={styles.container} ref={containerRef}>
      {segments.map((item, i) => (
        <button
          key={item.value}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          onClick={() => handleClick(item)}
          className={[
            styles.item,
            active === item.value ? styles.active : "",
            visible.includes(item) ? "" : styles.hiddenTab,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {item.icon && (
            <IconSvgMono src={item.icon} size={20} className={styles.icon} />
          )}
          <h4 className={styles.label} style={{ fontSize: fontSize }}>
            {item.label}
          </h4>
        </button>
      ))}

      <button
        ref={moreRef}
        className={styles.moreWrapper}
        style={{
          visibility: hidden.length > 0 ? "visible" : "hidden",
          pointerEvents: hidden.length > 0 ? "auto" : "none",
        }}
      >
        <FloatingCard
          isActive={open}
          setIsActive={setOpen}
          trigger={
            <div
              className={styles.item}
              onClick={() => setOpen((prev) => !prev)}
            >
              <p>More </p>
              <span> {hidden.length}</span>
            </div>
          }
        >
          {hidden.map((item) => (
            <FloatingCard.body
              key={item.value}
              onClick={() => {
                handleClick(item);
                setOpen(false);
              }}
            >
              {item.label}
            </FloatingCard.body>
          ))}
        </FloatingCard>
      </button>
    </div>
  );
};
