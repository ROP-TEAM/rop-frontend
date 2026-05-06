import IconSvgMono from "@/components/Icon/SvgIcon";
import { Modal } from "@/components/ui/Modal/Modal";
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
  const [isPatch, setIsPatch] = useState<boolean>(true);
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

          {/* 
        ========================
        Call/Trigger Patch Modal 
        ========================
        */}

          <FloatingCard.body onClick={() => setIsPatch(true)} isHasLine>
            + เพิ่มความสามารถเฉพาะ
          </FloatingCard.body>
        </FloatingCard>

        {/* 
        ========================
        Patch Modal 
        ========================
        */}

        <Modal
          marginTop="5rem"
          isActive={isPatch}
          onCloce={() => setIsPatch(false)}
        >
          <div className={styles.modal}>
            <div className={styles.header}>
              <div>
                <h2>ความสามารถเฉพาะ</h2>
                <p>แบดดีกรีวีน นู้ด แล็บ ไทม์ อพาร์ตเมนท์ลีกอพาร์ทเมนต์โทร</p>
              </div>
              <button>
                <IconSvgMono
                  color="var(--p-500)"
                  src="/icon/cross.svg"
                  size={12}
                />
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
