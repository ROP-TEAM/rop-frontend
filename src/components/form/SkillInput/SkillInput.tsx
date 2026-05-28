import IconSvgMono from "@/components/Icon/SvgIcon";
import { Modal } from "@/components/modal/Modal/Modal";
import { SKillInputProps } from "./SkillInput.types";
import styles from "./SkillInput.module.scss";
import { SkillPill } from "@/components/ui/SkillPill/SkillPill";
import { FloatingCard } from "@/components/ui/FloatingCard/FloatingCard";
import React, { useRef, useState } from "react";
export const SkillInput = ({
  isMutiSelect = true,
  label,
  labelColor = "var(--p-700)",
  labelSize = "1rem",
  skills,
  value,
  onChange,
}: SKillInputProps) => {
  const [isPatch, setIsPatch] = useState<boolean>(false);
  const [isDrop, setIsDrop] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [skillList, setSkillList] = useState<{ name: string; color: string }[]>(
    [
      { name: "ของเย็น", color: "#F87171" },
      // { name: "ขนม", color: "#60A5FA" },
      // { name: "ของทอด", color: "#F87171" },
      // { name: "ปลาแห้ง", color: "#4ADE80" },
    ],
  );
  const [lastestValue, setLastestValue] = useState<string>("");
  const newSkillRef = useRef<HTMLInputElement>(null);

  const handleAddnewSkill = () => {
    if (skillList.some((s) => s.name === "ไม่ทราบชื่อ")) return;
    setSkillList((prev) => [
      ...prev,
      { name: "ไม่ทราบชื่อ", color: "#d3d3d3" },
    ]);
    setTimeout(() => newSkillRef.current?.focus(), 0);
  };
  const colorList: string[] = [
    "#F87171",
    "#FB923C",
    "#FACC15",
    "#4ADE80",
    "#22D3EE",
    "#60A5FA",
    "#A78BFA",
    "#F472B6",

    "#FCA5A5",
    "#FDBA74",
    "#FDE047",
    "#86EFAC",
    "#67E8F9",
    "#93C5FD",
    "#C4B5FD",
    "#F9A8D4",
  ];
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
          focusBackgroundColor="transparent"
          isActive={isDrop}
          setIsActive={setIsDrop}
          isOnTop={0.8}
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
                  <SkillPill
                    color="var(--p-300)"
                    title="สินค้าทั่วไป"
                  ></SkillPill>
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
                  if (isMutiSelect) {
                    onChange(value.filter((f) => f.title !== s.title));
                  }
                  onChange([]);
                } else {
                  if (isMutiSelect) onChange([...value, s]);
                  onChange([s]);
                }
                if (!isMutiSelect) {
                  setIsDrop(false);
                }
              }}
            >
              {/* {s.title} */}{" "}
              <SkillPill title={s.title} color={s.color}></SkillPill>
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
          onClose={() => setIsPatch(false)}
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
              <tbody className={styles.tableBody}>
                {skillList.map((s, index) => (
                  <React.Fragment key={index}>
                    <tr className={styles.row}>
                      <td className={styles.editInfo}>
                        <div
                          className={styles.eachSkill}
                          style={{ backgroundColor: s.color }}
                        >
                          <input
                            ref={
                              skillList.length - 1 === index
                                ? newSkillRef
                                : null
                            }
                            className={styles.skillInput}
                            type="text"
                            style={{ backgroundColor: s.color }}
                            value={s.name.trim()}
                            onFocus={(e) => {
                              setActiveIndex(index);
                              setLastestValue(e.target.value);
                            }}
                            onBlur={(e) => {
                              e.preventDefault();
                              const related = e.relatedTarget as HTMLElement;
                              if (related?.closest(`.${styles.colorPicker}`)) {
                                return;
                              }
                              setActiveIndex(-1);
                              const val = e.target.value;
                              if (
                                skillList.findIndex((v) => v.name === val) !==
                                  index ||
                                val === ""
                              ) {
                                const newList = [...skillList];
                                newList[index] = {
                                  ...skillList[index],
                                  name: lastestValue,
                                };
                                setSkillList(newList);
                              }
                            }}
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

                    {/* 
                    ========================
                    Color Picker Modal 
                    ========================
                    */}
                    {activeIndex == index && (
                      <tr>
                        <td colSpan={2}>
                          <div className={`${styles.colorPicker}`}>
                            {colorList.map((c, ci) => (
                              <button
                                onClick={() => {
                                  setSkillList((prev) =>
                                    prev.map((item, cindex) =>
                                      cindex === index
                                        ? { ...item, color: c }
                                        : item,
                                    ),
                                  );
                                }}
                                type="button"
                                key={ci}
                                className={`${styles.eachColor}  `}
                                style={{ backgroundColor: c }}
                              >
                                {s.color == c && (
                                  <IconSvgMono
                                    src="/icon/check.svg"
                                    size={20}
                                    color="#ffffff"
                                  />
                                )}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            <button
              onMouseDown={(e) => {
                e.preventDefault();
                handleAddnewSkill();
              }}
              className={styles.add}
              type="button"
            >
              <p>+ เพิ่มใหม่ ...</p>
            </button>
            <div className={styles.footer}>
              <button
                type="button"
                className={styles.cancel}
                onClick={() => setIsPatch(false)}
              >
                ยกเลิก
              </button>
              <button type="button" className={styles.confirm}>
                ยืนยัน
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
