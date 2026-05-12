import React, { useState } from "react";
import styles from "./VehicleUpload.module.scss";
import { FileDragInput } from "@/components/form/FileDragInput/FileDragInput";
import IconSvgMono from "@/components/Icon/SvgIcon";
import Image from "next/image";
import { StepperProp } from "@/components/ui/StepperControl/StepperControl.types";
import { StepperControl } from "@/components/ui/StepperControl/StepperControl";
export const VehicleUpload = () => {
  const [file, setFile] = useState<File>();
  const [state, setState] = useState<number>(1);
  const [header, setHeader] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [fileCount, setFileCount] = useState<{ row: number; column: number }>({
    row: 0,
    column: 0,
  });
  const ACEEPTFILE = [".csv"];
  const STEPPER: StepperProp[] = [
    { value: 0, label: "เลือกไฟล์" },
    { value: 1, label: "จัดการ" },
    { value: 2, label: "ตรวจสอบ" },
  ];

  const handleUploadFile = (file: File) => {
    if (!file.name.endsWith(".csv")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text.trim()) {
        setError("ไม่สามารถอัพโหลดไฟล์เปล่า");
        return;
      }

      const rows = text.split("\n").map((row) => row.trim());
      const Fileheader = rows[0];
      setHeader(Fileheader.split(","));
      setFile(file);
      setError("");
      setState(1);
    };
    reader.readAsText(file);
  };

  const VehicleUploadState = () => {
    switch (state) {
      case 0:
        return (
          <div className={styles.content}>
            <FileDragInput onChange={handleUploadFile}></FileDragInput>
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
          </div>
        );
      case 1:
        return (
          <div className={styles.manage}>
            <div className={styles.fileWrapper}>
              <div className={styles.fileInfo}>
                <h4>{file?.name ?? "ไม่ทราบขื่อ"}</h4>
                <div>
                  <p></p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

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
      <div></div>
      <StepperControl value={state} stepper={STEPPER}></StepperControl>
      <VehicleUploadState />
      <div className={styles.footer}>
        {error && <p className={styles.error}>เกิดข้อผิดพลาด: {error}</p>}
        <div className={styles.action}>
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
