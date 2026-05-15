import { FileDragInput } from "@/components/form/FileDragInput/FileDragInput";
import { SelectInput } from "@/components/form/SelectInput/SelectInput";
import IconSvgMono from "@/components/Icon/SvgIcon";
import { SkillPill } from "@/components/ui/SkillPill/SkillPill";
import { StepperControl } from "@/components/ui/StepperControl/StepperControl";
import { StepperProp } from "@/components/ui/StepperControl/StepperControl.types";
import Image from "next/image";
import { useState } from "react";
import styles from "./VehicleUpload.module.scss";
import { Vehicle, VehicleBase } from "@/types/api.types";
import { VehicleFileHeader } from "./VehicleUpload.types";
export const VehicleUpload = () => {
  const DEFAULT_HEADER_INDEX = -1;

  const [file, setFile] = useState<File>();
  const [state, setState] = useState<number>(2);
  const [header, setHeader] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [fileCount, setFileCount] = useState<{ row: number; column: number }>({
    row: 0,
    column: 0,
  });
  const [vehicleFileHeader, setVehicleFileHeader] = useState<VehicleFileHeader>(
    {
      workTimeStart: DEFAULT_HEADER_INDEX,
      workTimeEnd: DEFAULT_HEADER_INDEX,
      capacity: DEFAULT_HEADER_INDEX,
      startLocation: DEFAULT_HEADER_INDEX,
      endLocation: DEFAULT_HEADER_INDEX,
      maxTask: DEFAULT_HEADER_INDEX,
      skills: DEFAULT_HEADER_INDEX,
      model: DEFAULT_HEADER_INDEX,
      name: DEFAULT_HEADER_INDEX,
      numberPlate: DEFAULT_HEADER_INDEX,
    },
  );
  const OPTIONCOL = [
    {
      label: "เวลาเริ่มทำงาน",
      description: "รูปแบบ HH:MM หรือ HH.MM",
      value: "workTimeStart",
      required: true,
    },
    {
      label: "เวลาสิ้นสุดงาน",
      description: "รูปแบบ HH:MM หรือ HH.MM",
      value: "workTimeEnd",
      required: true,
    },
    {
      label: "น้ำหนักบรรทุก",
      description: "ตัวเลขมากกว่า 0",
      value: "capacity",
      required: true,
    },
    {
      label: "ตำแหน่งเริ่มต้น",
      description: "รูปแบบ latitude,longitude",
      value: "startLocation",
      required: true,
    },
    {
      label: "ตำแหน่งสิ้นสุด",
      description: "ถ้าต้องการให้กลับมาจุดเริ่มต้นให้เว้นว่างไว้",
      value: "endLocation",
      required: false,
    },
    {
      label: "จำนวนภาระงานสูงสุด",
      description: "ตัวเลขตั้งแต่ 0 ขึ้นไป หากไม่จำกัดให้เว้นว่าง",
      value: "maxTask",
      required: false,
    },
    {
      label: "ความสามารถเฉพาะ",
      description: 'คั่นด้วย , เช่น "ของเย็น,ผักสด"',
      value: "skills",
      required: false,
    },
    {
      label: "รุ่นรถ",
      description: "ชื่อรุ่นรถ เช่น Toyota Revo",
      value: "model",
      required: false,
    },
    {
      label: "ชื่อรถหรือชื่อพนักงาน",
      description: "สามารถเว้นว่างได้",
      value: "name",
      required: false,
    },
    {
      label: "ทะเบียนรถ",
      description: "เช่น กข1234",
      value: "numberPlate",
      required: false,
    },
  ] as const;
  const ACEEPTFILE = [".csv"];
  const STEPPER: StepperProp[] = [
    { value: 0, label: "เลือกไฟล์" },
    { value: 1, label: "จัดการ" },
    { value: 2, label: "ตรวจสอบ" },
  ];

  const handleUploadFile = (file: File) => {
    const isCsv = file.name.toLowerCase().endsWith(".csv");

    if (!isCsv) {
      setError("รองรับประเภทไฟล์ .csv เท่านั้น");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text.trim()) {
        setError("ไม่สามารถอัพโหลดไฟล์เปล่า");
        return;
      }

      const rows = text.split("\n").map((row) => row.trim());
      const Fileheader = rows[0];
      setHeader(Fileheader.split(",").map((item) => item.replace(/"/g, "")));
      setFile(file);
      setError("");
      setState(1);
    };
    reader.readAsText(file);
  };

  const handleNextState = () => {
    if (state == 1) {
      if (
        vehicleFileHeader.startLocation == -1 ||
        vehicleFileHeader.workTimeEnd == -1 ||
        vehicleFileHeader.workTimeStart == -1 ||
        vehicleFileHeader.capacity == -1
      ) {
        setError("เลือกข้อมูลให้ครบถ้วน");
        return;
      }
      setState(2);
      setError("");
    }
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
              <div className={styles.fileWrapperInfo}>
                <SkillPill
                  title={file?.name.split(",")[1] ?? ".csv"}
                  color="var(--g-300)"
                ></SkillPill>
                {(() => {
                  if (!file?.name) {
                    return;
                  }
                  const name =
                    file?.name.length > 15
                      ? file.name.substring(0, 15) + "..."
                      : file?.name;
                  return <h4>{name} .csv</h4>;
                })()}
                <p className={styles.fileCount}>
                  {fileCount.column} หลัก {fileCount.row} แถว
                </p>
              </div>
              <button onClick={() => setState(0)} className={styles.changeFile}>
                เปลี่ยนไฟล์
              </button>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.selectTable}>
                <thead className={styles.selectHeader}>
                  <tr>
                    <th>ข้อมูลของระบบ</th>
                    <th>ไฟล์ที่นำเข้า</th>
                  </tr>
                </thead>
                <tbody>
                  {OPTIONCOL.map((f, index) => {
                    const headerIndex = vehicleFileHeader[f.value];
                    let headerName = header[headerIndex];
                    const checkList: number[] = [];
                    Object.values(vehicleFileHeader).forEach((item) => {
                      if (item != DEFAULT_HEADER_INDEX) {
                        checkList.push(item);
                      }
                    });
                    const changeHeader = (val: string) => {
                      const nextIndex = header.indexOf(val);
                      setVehicleFileHeader((prev) => {
                        const updated = { ...prev };
                        Object.keys(updated).forEach((key) => {
                          const typedKey = key as keyof typeof updated;
                          if (
                            typedKey !== f.value &&
                            updated[typedKey] == nextIndex
                          ) {
                            updated[typedKey] = DEFAULT_HEADER_INDEX;
                          }
                          updated[f.value] = nextIndex;
                        });
                        return updated;
                      });
                    };
                    return (
                      <tr key={index} className={styles.selectInternal}>
                        <td className={styles.selectSystem}>
                          <h3 className={styles.selectTitle}>
                            <span>{f.label}</span>
                            {f.required && (
                              <span className={styles.require}> *</span>
                            )}
                          </h3>
                          <p className={styles.selectDescription}>
                            {f.description}
                          </p>
                        </td>
                        <td className={styles.selectImport}>
                          {
                            <SelectInput
                              isOnTop={0.6}
                              checkList={checkList}
                              activeFontColor="var(--s-500)"
                              activeBackground="var(--s-300)"
                              activeBorder="0.125rem solid var(--s-500)"
                              placeholder="ยังไม่ได้เลือกค่า"
                              value={headerName}
                              onChange={(value) => changeHeader(value)}
                              options={header}
                            ></SelectInput>
                          }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.invalidFile}>
            <div className={styles.caution}>
              <div className={styles.cautionInfo}>
                <IconSvgMono src="/icon/caution.svg" color="red"></IconSvgMono>
                <div>
                  <h3 className={styles.cautionTitle}>
                    ตรวจพบข้อผิดพลาดในการนำเข้าไฟล์
                  </h3>
                  <p></p>
                </div>
              </div>
              <div></div>
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
      <StepperControl value={state} stepper={STEPPER}></StepperControl>
      <div className={styles.contentAction}>
        <VehicleUploadState />
      </div>
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
          <button
            onClick={() => {
              handleNextState();
            }}
            type="button"
            className={styles.confirm}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

const ErrorTable = () => {
  return <div></div>;
};
