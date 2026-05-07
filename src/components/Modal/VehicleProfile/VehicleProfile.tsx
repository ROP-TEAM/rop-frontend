import IconSvgMono from "@/components/Icon/SvgIcon";
import styles from "./VehicleProfile.module.scss";
import React, { useState } from "react";
import { TextInput } from "@/components/form/TextInput/TextInput";
import { VehicleProfileProps } from "./VehicleProfile.types";
export const VehicleProfile = ({ onClose }: VehicleProfileProps) => {
  const [pickedIndex, setPickedIndex] = useState<number>(0);
  const [isText, setIsText] = useState<boolean>(true);
  const [name, setName] = useState("มหากายพ์น้ำแข็งลุกป้อก");
  const [model, setModel] = useState("TOYOTA V OA");
  const [numberPlate, setNumberPlate] = useState("กขค 123");
  const colorList: string[] = [
    "#F87171",
    "#FB923C",
    "#FACC15",
    "#4ADE80",
    "#22D3EE",
    "#60A5FA",

    "#FCA5A5",
    "#FDBA74",
    "#FDE047",
    "#86EFAC",
    "#67E8F9",
    "#93C5FD",
  ];
  return (
    <div className={styles.vehicleProfile}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h3>โปรไฟล์ยานพาหนะ</h3>
          <p>แบดดีกรีวีน นู้ด แล็บ ไทม์ อพาร์ตเมนท์ลีกอพาร์ทเมนต์โทร</p>
        </div>
        <button
          type="button"
          onClick={() => onClose()}
          className={styles.action}
        >
          <IconSvgMono
            src="/icon/cross.svg"
            size={12}
            color="var(--p-500)"
          ></IconSvgMono>
        </button>
      </div>
      <form
        className={styles.form}
        style={
          { "--overflow-y": isText ? "none" : "auto" } as React.CSSProperties
        }
      >
        {isText ? (
          <div className={styles.formText}>
            <button
              style={{
                backgroundColor: colorList[pickedIndex],
                width: "3.2rem",
                height: "3.2rem",
                margin: "auto",
              }}
              className={styles.profile}
              type="button"
              onClick={() => setIsText(false)}
            ></button>
            <TextInput
              labelGap="0.25rem"
              border="0.0625rem solid var(--p-300)"
              fontSize="0.85rem"
              fontWeight="400"
              value={name}
              color="var(--p-700)"
              onChange={setName}
              placeholder="กรุณากรอกชื่อ"
              label="ชื่อที่แสดง"
              labelSize="0.825rem"
              labelColor="var(--p-500)"
            ></TextInput>
            <TextInput
              labelGap="0.25rem"
              border="0.0625rem solid var(--p-300)"
              fontSize="0.85rem"
              fontWeight="400"
              value={model}
              color="var(--p-700)"
              onChange={setModel}
              placeholder="กรุณากรอกรุ่นยานพาหนะ"
              label="รุ่นยานพาหนะ"
              labelSize="0.825rem"
              labelColor="var(--p-500)"
            ></TextInput>
            <TextInput
              labelGap="0.25rem"
              border="0.0625rem solid var(--p-300)"
              fontSize="0.85rem"
              fontWeight="400"
              value={numberPlate}
              color="var(--p-700)"
              onChange={setNumberPlate}
              placeholder="กรุณากรอกหมายเลขทะเบียน"
              label="หมายเลขทะเบียน"
              labelSize="0.825rem"
              labelColor="var(--p-500)"
            ></TextInput>
          </div>
        ) : (
          <div className={styles.profilePicker}>
            <div className={styles.backward} onClick={() => setIsText(true)}>
              <IconSvgMono
                src="/icon/arrow-left.svg"
                color="var(--p-700)"
                size={20}
              ></IconSvgMono>
              <h4 className={styles.text}>ตัวเลือกโปรไฟล์</h4>
            </div>
            <div className={styles.selectContainer}>
              {colorList.map((c, index) => (
                <button
                  type="button"
                  onClick={() => {
                    setIsText(true);
                    setPickedIndex(index);
                  }}
                  key={index}
                  style={{
                    borderRadius: "0.2rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: c,
                    width: "3rem",
                    height: "3rem",
                  }}
                >
                  {pickedIndex == index && (
                    <IconSvgMono
                      src="/icon/check.svg"
                      color="var(--p-0)"
                    ></IconSvgMono>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.cancel}
          onClick={() => onClose()}
        >
          ยกเลิก
        </button>
        <button type="button" className={styles.confirm}>
          ยืนยัน
        </button>
      </div>
    </div>
  );
};
