"use  client";

import { SKillInputProps } from "./SkillInput.types";
import styles from "./SkillInput.module.scss";
import { SkillPill } from "@/components/ui/SkillPill/SkillPill";
import { FloatingCard } from "@/components/ui/FloatCard/FloatCard";
import React, { useState } from "react";
export const SkillInput = ({
  label,
  labelColor = "var(--p-700)",
  labelSize = "1rem",
  skills,
  value,
  onChange,
}: SKillInputProps) => {
  const handleSendFocusInput = () => {};
  const [isDrop, setIsDrop] = useState(false);
  return (
    <div>
      {label && (
        <label
          className={styles.label}
          style={
            {
              "--label-color": labelColor,
              "--label-size": labelSize,
            } as React.CSSProperties
          }
        >
          {label}
        </label>
      )}
      <div className={styles.input}>
        <FloatingCard
          isActive={isDrop}
          setIsActive={setIsDrop}
          isOnTop={true}
          trigger={
            <div className={styles.trigger}>
              {value?.length !== 0 || isDrop ? (
                <div
                  onClick={() => setIsDrop(true)}
                  className={`${styles.skillPillContainer} ${isDrop ? styles.active : ""}`}
                >
                  {value.map((s, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (!isDrop) return;
                        onChange(value.filter((p) => p.title !== s.title));
                      }}
                    >
                      <SkillPill
                        title={s.title}
                        color={s.color}
                        isHasClose={isDrop}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <button
                  className={styles.noSkill}
                  onClick={() => setIsDrop((prev) => !prev)}
                >
                  ไม่มีความสามารถเฉพาะ
                </button>
              )}
            </div>
          }
        >
          {skills.map((s, index) => (
            <FloatingCard.body
              key={index}
              isHasCheck={value.some((h) => h.title === s.title)}
              onClick={() => {
                const exist = value.some((v) => v.title === s.title);
                if (exist) {
                  onChange(value.filter((f) => f.title !== s.title));
                } else {
                  onChange([...value, s]);
                }
              }}
            >
              {s.title}
            </FloatingCard.body>
          ))}
          <FloatingCard.body isHasLine>
            + เพิ่มความสามารถเฉพาะ
          </FloatingCard.body>
        </FloatingCard>
      </div>
    </div>
  );
};
