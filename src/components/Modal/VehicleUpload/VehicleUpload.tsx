import { FileDragInput } from "@/components/form/FileDragInput/FileDragInput";
import { SelectInput } from "@/components/form/SelectInput/SelectInput";
import IconSvgMono from "@/components/Icon/SvgIcon";
import { SkillPill } from "@/components/ui/SkillPill/SkillPill";
import { StepperControl } from "@/components/ui/StepperControl/StepperControl";
import { StepperProp } from "@/components/ui/StepperControl/StepperControl.types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./VehicleUpload.module.scss";
import { Vehicle, VehicleBase } from "@/types/api.types";
import {
  ErrorTableProps,
  PreviewTableProps,
  VehicleFileHeader,
} from "./VehicleUpload.types";
export const VehicleUpload = () => {
  const DEFAULT_HEADER_INDEX = -1;

  const [file, setFile] = useState<File>();
  const [state, setState] = useState<number>(0);
  const [header, setHeader] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [fileCount, setFileCount] = useState<{ row: number; column: number }>({
    row: 0,
    column: 0,
  });
  const [colData, setColData] = useState<string[][]>([]);
  const [vehicleFileHeader, setVehicleFileHeader] = useState<VehicleFileHeader>(
    {
      workTimeStart: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "เวลาเริ่มทำงาน",
        description: "รูปแบบ HH:MM หรือ HH.MM",
        value: "workTimeStart",
        require: true,
        regex: /^([01]\d|2[0-3])[:.]([0-5]\d)$/,
      },

      workTimeEnd: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "เวลาสิ้นสุดงาน",
        description: "รูปแบบ HH:MM หรือ HH.MM",
        value: "workTimeEnd",
        require: true,
        regex: /^([01]\d|2[0-3])[:.]([0-5]\d)$/,
      },
      capacity: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "น้ำหนักบรรทุก",
        description: "ตัวเลขมากกว่า 0",
        value: "capacity",
        require: true,
      },

      startLocation: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "ตำแหน่งเริ่มต้น",
        description: "รูปแบบ latitude,longitude",
        value: "startLocation",
        require: true,
        regex:
          /^-?(90(?:\.0{1,6})?|[0-8]?\d(?:\.\d{1,6})?),-?(180(?:\.0{1,6})?|1[0-7]\d(?:\.\d{1,6})?|\d{1,2}(?:\.\d{1,6})?)$/,
      },

      endLocation: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "ตำแหน่งสิ้นสุด",
        description: "ถ้าต้องการให้กลับมาจุดเริ่มต้นให้เว้นว่างไว้",
        value: "endLocation",
        require: false,
      },

      maxTask: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "จำนวนภาระงานสูงสุด",
        description: "ตัวเลขตั้งแต่ 0 ขึ้นไป หากไม่จำกัดให้เว้นว่าง",
        value: "maxTask",
        require: false,
      },

      skills: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "ความสามารถเฉพาะ",
        description: 'คั่นด้วย , เช่น "ของเย็น,ผักสด"',
        value: "skills",
        require: false,
      },

      model: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "รุ่นรถ",
        description: "ชื่อรุ่นรถ เช่น Toyota Revo",
        value: "model",
        require: false,
      },

      name: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "ชื่อรถหรือชื่อพนักงาน",
        description: "สามารถเว้นว่างได้",
        value: "name",
        require: false,
      },

      numberPlate: {
        fileCol: DEFAULT_HEADER_INDEX,
        errorRows: [],
        label: "ทะเบียนรถ",
        description: "เช่น กข1234",
        value: "numberPlate",
        require: false,
      },
    },
  );

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

      const rows = text.split("\n").map((row) => {
        const rowData = row.trim();
        return rowData;
      });
      const Fileheader = rows[0];
      for (let i = 0; i < Fileheader.length; i++) {
        colData.push(
          rows.map((row) => {
            const cols = row.split(",");
            return cols[i];
          }),
        );
      }
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
        vehicleFileHeader.startLocation.fileCol == -1 ||
        vehicleFileHeader.workTimeEnd.fileCol == -1 ||
        vehicleFileHeader.workTimeStart.fileCol == -1 ||
        vehicleFileHeader.capacity.fileCol == -1
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
                  {Object.values(vehicleFileHeader).map((f, index) => {
                    const headerIndex = f.fileCol;

                    const headerName =
                      headerIndex !== DEFAULT_HEADER_INDEX
                        ? header[headerIndex]
                        : "";

                    const checkList: number[] = [];

                    Object.values(vehicleFileHeader).forEach((item) => {
                      if (item.fileCol !== DEFAULT_HEADER_INDEX) {
                        checkList.push(item.fileCol);
                      }
                    });

                    const changeHeader = (val: string) => {
                      const nextIndex = header.indexOf(val);

                      setVehicleFileHeader((prev) => {
                        const updated = { ...prev };

                        Object.keys(updated).forEach((key) => {
                          const typedKey = key as keyof VehicleFileHeader;

                          if (
                            typedKey !== f.value &&
                            updated[typedKey].fileCol === nextIndex
                          ) {
                            updated[typedKey] = {
                              ...updated[typedKey],
                              fileCol: DEFAULT_HEADER_INDEX,
                            };
                          }
                        });

                        const fieldKey = f.value as keyof VehicleFileHeader;

                        updated[fieldKey] = {
                          ...updated[fieldKey],
                          fileCol: nextIndex,
                        };

                        return { ...updated };
                      });
                    };

                    return (
                      <tr key={index} className={styles.selectInternal}>
                        <td className={styles.selectSystem}>
                          <h3 className={styles.selectTitle}>
                            <span>{f.label}</span>

                            {f.require && (
                              <span className={styles.require}> *</span>
                            )}
                          </h3>

                          <p className={styles.selectDescription}>
                            {f.description}
                          </p>
                        </td>

                        <td className={styles.selectImport}>
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
                          />
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
            {Object.values(vehicleFileHeader).some(
              (item) => item.errorRows.length == 0,
            ) && (
              <div className={styles.caution}>
                <div className={styles.cautionInfo}>
                  <IconSvgMono
                    src="/icon/caution.svg"
                    color="red"
                    size={28}
                  ></IconSvgMono>
                  <div>
                    <h3 className={styles.cautionTitle}>
                      ตรวจพบข้อผิดพลาดในการนำเข้าไฟล์
                    </h3>
                    <p className={styles.cautionDescription}>
                      พบข้อมูล 4 ประภทเกิดข้อผิดพลาดในการแปลงไฟล์
                      กรุณาแก้ไขข้อผิดพลาดแล้วลองใหม่อีกครั้ง
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.erorrTableWarpper}>
              <p className={styles.errorTitle}>ข้อมูลข้อผิดพลาด</p>
              {Object.values(vehicleFileHeader).map((f, index) => {
                if (f.fileCol == -1) return;
                return (
                  <ErrorTable
                    key={index}
                    errorRows={f.errorRows}
                    onValid={(errorRows) =>
                      setVehicleFileHeader((prev) => ({
                        ...prev,
                        [f.value as keyof VehicleFileHeader]: {
                          ...prev[f.value as keyof VehicleFileHeader],
                          ErrorRows: errorRows,
                        },
                      }))
                    }
                    description={f.description}
                    systemHeader={f.label}
                    data={colData[f.fileCol]}
                    regex={f.regex ?? undefined}
                  ></ErrorTable>
                );
              })}
            </div>
            <p className={styles.errorTitle}>ตัวอย่างข้อมูลนำเข้า</p>
            <PreviewTable
              tableInfo={Object.values(vehicleFileHeader).map((v, index) => {
                return {
                  fileCol: v.fileCol,
                  label: v.label,
                  errorRows: v.errorRows,
                };
              })}
              colData={colData}
            ></PreviewTable>
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

const ErrorTable = ({
  systemHeader,
  data,
  regex,
  description,
  errorRows,
  onValid,
}: ErrorTableProps) => {
  useEffect(() => {
    if (!regex) return;
    const errorRowsTemp: number[] = [];
    for (let i = 0; i < data.length; i++) {
      if (!regex.test(data[i])) {
        errorRowsTemp.push(i);
      }
    }
    if (JSON.stringify(errorRowsTemp) !== JSON.stringify(errorRows)) {
      onValid(errorRowsTemp);
    }
  }, [data, regex]);
  if (errorRows.length == 0) return;
  return (
    <div className={styles.errorTable}>
      <div className={styles.errorTableInfo}>
        <h3 className={styles.errorTableName}>{systemHeader}</h3>
        <div className={styles.errorTableReview}>
          <p className={styles.errorTableDetail}>
            {errorRows.length} ข้อผิดพลาด·หลัก:
          </p>
          <h4 className={styles.errorTableColName}>
            {data[0].replace(/"/g, "")}
          </h4>
        </div>
      </div>
      <div className={styles.errorTableContent}>
        <p className={styles.errorTableRequire}>{description}</p>
        <div className={styles.errorTableRows}>
          {errorRows.map((err, index) => {
            if (index > 3) return;
            return (
              <div className={styles.errorTableFile} key={index}>
                <div className={styles.errorTableFileRow}>แถวที่ {err + 1}</div>
                <p className={styles.errorTableFileContent}>
                  {data[err].trim() == "" ? `""` : data[err]}
                </p>
              </div>
            );
          })}
          <p className={styles.errorTableMore}>
            และอีก +{errorRows.length - 4} แถว
          </p>
        </div>
      </div>
    </div>
  );
};

export const PreviewTable = ({ tableInfo, colData }: PreviewTableProps) => {
  const PREVIEW_LENGTH = 5;

  return (
    <div className={styles.previewTable}>
      <div>
        <p className={styles.headerIndex}>#</p>
        {Array.from({ length: PREVIEW_LENGTH }).map((_, index) => {
          return (
            <div className={styles.contentPreviewIndex} key={index}>
              {index + 1}
            </div>
          );
        })}
      </div>
      <div className={styles.headerSystem}>
        {tableInfo.map((row, rowIndex) => {
          if (row.fileCol != -1)
            return (
              <div key={rowIndex}>
                <p className={styles.headerChild}>{row.label}</p>
                {colData[row.fileCol].map((c, cIndex) => {
                  if (cIndex < PREVIEW_LENGTH + 1 && cIndex != 0)
                    return (
                      <div key={cIndex} className={`${styles.contentPreview} ${}`}>
                        {c == "" ? `""` : c}
                      </div>
                    );
                })}
                {/* {row.map((col, colIndex) => {
                if (row[0] && colIndex < PREVIEW_LENGTH + 1) {
                  if (colIndex == 0) {
                    return (
                      <p className={styles.headerChild} key={colIndex}>
                        {col.replace(/"/g, "")}
                      </p>
                    );
                  } else {
                    return (
                      <div className={styles.contentPreview} key={colIndex}>
                        {col.trim() == "" ? `""` : col}
                      </div>
                    );
                  }
                } else {
                  return null;
                }
              })} */}
              </div>
            );
        })}
      </div>
    </div>
  );
};
