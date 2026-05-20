import React from "react";
import styles from "./SkillPill.module.scss";
import { SkillPillProps } from "./SkillPill.types";
import IconSvgMono from "@/components/Icon/SvgIcon";
export const SkillPill = ({
  title,
  color,
  isHasClose = false,
}: SkillPillProps) => {
  return (
    <div
      style={{ "--pill-color": color } as React.CSSProperties}
      className={styles.skillPill}
    >
      <h4>{title}</h4>
      {isHasClose && (
        <IconSvgMono
          size={8}
          color="var(--p-700)"
          src="/icon/cross.svg"
        ></IconSvgMono>
      )}
    </div>
  );
};
