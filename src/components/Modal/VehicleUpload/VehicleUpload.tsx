import React, { useState } from "react";
import styles from "./VehicleUpload.module.scss";
import { FileDragInput } from "@/components/form/FileDragInput/FileDragInput";
import IconSvgMono from "@/components/Icon/SvgIcon";
import Image from "next/image";
export const VehicleUpload = () => {
  const [file, setFiles] = useState<File>();
  const [state, setState] = useState<Number>(0);
  const ACEEPTFILE = [".csv"];
  return (
    <div className={styles.vehicleUpload}>
      <div className={styles.header}>
        <h2 className={styles.title}>เพิ่มยานพาหนะ</h2>
        <IconSvgMono
          src="/icon/cross.svg"
          size={12}
          color="var(--p-500)"
        ></IconSvgMono>
      </div>
      {file && <div>{file.name}</div>}
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
            <h3 className={styles.text}>รูปแบบไฟล์ที่ถูกต้อง</h3>
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
  );
};
