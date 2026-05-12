import React, { useState } from "react";
import styles from "./VehicleUpload.module.scss";
import { FileDragInput } from "@/components/form/FileDragInput/FileDragInput";
import IconSvgMono from "@/components/Icon/SvgIcon";
import Image from "next/image";
import { StepperProp } from "@/components/ui/StepperControl/StepperControl.types";
import { StepperControl } from "@/components/ui/StepperControl/StepperControl";
export const VehicleUpload = () => {
  const [file, setFiles] = useState<File>();
  const [state, setState] = useState<number>(0);
  const ACEEPTFILE = [".csv"];
  const STEPPER: StepperProp[] = [
    { value: 0, label: "เลือกไฟล์" },
    { value: 1, label: "จัดการ" },
    { value: 2, label: "ตรวจสอบ" },
  ];
  return (
    <div className={styles.vehicleUpload}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h2 className={styles.title}>เพิ่มยานพาหนะ</h2>
          <p> สคริปต์ลาเต้ฟรุตชะโนด สี่แยกชัวร์คูลเลอร์จังโก้ซานตาคลอส</p>
        </div>
        <IconSvgMono
          src="/icon/cross.svg"
          size={12}
          color="var(--p-500)"
        ></IconSvgMono>
      </div>
      <StepperControl value={state} stepper={STEPPER}></StepperControl>

      <div className={styles.content}>
        <FileDragInput file={file} onChange={setFiles}></FileDragInput>
        <div className={styles.fileInfo}>
          <p>ประเภทไฟล์ที่รองรับ {ACEEPTFILE.join(",")}</p>
          <p>ขนาดไฟล์สูงสุด 201 แถว</p>
        </div>
        <div className={styles.fileTemplate}>
          <div>
            <div className={styles.fileTemplateHeader}>
              <Image
                src={"/flat/excel.svg"}
                alt="excel"
                width={20}
                height={20}
              ></Image>
              <h3 className={styles.text}>ตัวอย่างไฟล์ที่ถูกต้อง</h3>
            </div>
            <p className={styles.fileTempalateDescription}>
              สคริปต์ลาเต้ฟรุตชะโนด สี่แยกชัวร์คูลเลอร์จังโก้ซานตาคลอส
              วิกเพลย์บอยพลานุภาพ
            </p>
          </div>
          <button className={styles.download}>ดาวโหลดไฟล์</button>
        </div>
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.cancel}
            // onClick={() => onclose()}
          >
            ยกเลิก
          </button>
          <button type="button" className={styles.confirm}>
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};
