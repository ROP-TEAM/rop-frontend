import React, { useState } from "react";
import styles from "./VehicleUpload.module.scss";
import { FileDragInput } from "@/components/form/FileDragInput/FileDragInput";
import IconSvgMono from "@/components/Icon/SvgIcon";
export const VehicleUpload = () => {
  const [file, setFiles] = useState<File>();
  const [state, setState] = useState<Number>(0);
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
    </div>
  );
};
