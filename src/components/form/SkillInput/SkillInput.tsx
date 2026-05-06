import IconSvgMono from "@/components/Icon/SvgIcon";
import { Modal } from "@/components/ui/Modal/Modal";
import { SKillInputProps } from "./SkillInput.types";
import styles from "./SkillInput.module.scss";
import { SkillPill } from "@/components/ui/SkillPill/SkillPill";
import { FloatingCard } from "@/components/ui/FloatCard/FloatCard";
import React, { useState } from "react";
import { TextInput } from "../TextInput/TextInput";
export const SkillInput = ({
  label,
  labelColor = "var(--p-700)",
  labelSize = "1rem",
  skills,
  value,
  onChange,
}: SKillInputProps) => {
  const [isPatch, setIsPatch] = useState<boolean>(true);
  const [isDrop, setIsDrop] = useState(false);
  const [skillList, setSkillList] = useState<{ name: string; color: string }[]>(
    [
      { name: "ของเย็น", color: "#4FC3F7" },
      { name: "ของสด", color: "#81C784" },
      { name: "ของแห้ง", color: "#FFB74D" },
      { name: "เครื่องดื่ม", color: "#BA68C8" },
      { name: "ขนม", color: "#F06292" },
    ],
  );
  const handleSendFocusInput = () => {};
  const handleAddnewSkill = () => {};
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
              <button onClick={() => setIsPatch(false)}>
                <IconSvgMono
                  color="var(--p-500)"
                  src="/icon/cross.svg"
                  size={12}
                />
              </button>
            </div>

            {/* 
        ========================
        Table Patch Modal 
        ========================
        */}
            <table className={styles.tableSkill}>
              <thead>
                <tr>
                  <th className={styles.colName} scope="col">
                    <p>ชื่อ</p>
                  </th>
                  <th scope="col">
                    <p>ที่เกี่ยวข้อง</p>
                  </th>
                </tr>
              </thead>

              <tbody>
                {skillList.map((s, index) => (
                  <tr key={index}>
                    <td className={styles.editInfo}>
                      {/* <div
                        className={styles.color}
                        style={{ backgroundColor: s.color }}
                      ></div> */}
                      <div
                        className={styles.eachSkill}
                        style={{ backgroundColor: s.color }}
                      >
                        <input
                          className={styles.skillInput}
                          type="text"
                          style={{ backgroundColor: s.color }}
                          value={s.name.trim()}
                          onChange={(e) => {
                            const val = e.target.value.trim();
                            if (val.length > 15) return;
                            const newList = [...skillList];
                            newList[index] = {
                              ...skillList[index],
                              name: val,
                            };
                            setSkillList(newList);
                          }}
                        />
                        <button
                          className={styles.icon}
                          type="button"
                          onClick={() => {
                            setSkillList((prev) =>
                              prev.filter((f) => f.name !== s.name),
                            );
                          }}
                        >
                          <IconSvgMono
                            src="/icon/cross.svg"
                            size={8}
                            color="var(--p-700)"
                          />
                        </button>
                      </div>
                    </td>
                    <td className={styles.info}>
                      <div className={styles.infoContent}>
                        <span className={styles.iconContainer}>
                          <IconSvgMono
                            src="/icon/package.svg"
                            size={20}
                            color="var(--p-500)"
                          />
                          <p>{14}</p>
                        </span>
                        <span className={styles.iconContainer}>
                          <IconSvgMono
                            src="/icon/truck.svg"
                            size={20}
                            color="var(--p-500)"
                          />
                          <p>{14}</p>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className={styles.add} type="button">
              <p>+ เพิ่มใหม่ ...</p>
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
