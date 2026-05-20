import { FileDragInput } from "@/components/form/FileDragInput/FileDragInput";
import { SelectInput } from "@/components/form/SelectInput/SelectInput";
import IconSvgMono from "@/components/Icon/SvgIcon";
import { SkillPill } from "@/components/ui/SkillPill/SkillPill";
import { StepperControl } from "@/components/ui/StepperControl/StepperControl";
import { StepperProp } from "@/components/ui/StepperControl/StepperControl.types";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./VehicleUpload.module.scss";
import {
  ErrorTableProps,
  UploadStepperProps,
  PreviewTableProps,
  VehicleFileHeader,
} from "./VehicleUpload.types";
export const VehicleUpload = ({
  vehicleFileHeader,
  setVehicleFileHeader,
  onClose,
}: UploadStepperProps) => {
  const DEFAULT_HEADER_INDEX = -1;

  const [file, setFile] = useState<File>();
  const [state, setState] = useState<number>(0);
  const [fileHeader, setFileHeader] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const [colData, setColData] = useState<string[][]>([]);

  const ACEEPTFILE = [".csv"];
  const STEPPER: StepperProp[] = [
    { value: 0, label: "เลือกไฟล์" },
    { value: 1, label: "จัดการ" },
    { value: 2, label: "ตรวจสอบ" },
  ];
  const ishasErrorFile = Object.values(vehicleFileHeader).some((item) => {
    if (item.errorRows.length > 0) return true;
  });
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

      const rows = text.split(/\r?\n/).filter((row) => row.trim() !== "");

      const parsedRows = rows.map(
        (row) =>
          row
            .match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
            ?.map((item) => item.replace(/^"|"$/g, "")) || [],
      );

      const headers = parsedRows[0];

      const tempColData: string[][] = [];

      const updatedVehicleFileHeader = structuredClone(vehicleFileHeader);

      for (let i = 0; i < headers.length; i++) {
        tempColData.push(parsedRows.map((row) => row[i] ?? ""));

        const header = headers[i].trim();
        console.log(tempColData[i]);
        for (const v of Object.values(updatedVehicleFileHeader)) {
          if (header.includes(v.label)) {
            v.fileCol = i;
          }
        }
      }

      setVehicleFileHeader(updatedVehicleFileHeader);

      setFileHeader(headers);
      setColData(tempColData);
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
    if (state == 2 && !ishasErrorFile) {
      onClose();
    }
  };
  const handlePreviousState = () => {
    if (state == 0) return;
    setState((prev) => prev - 1);
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
                  {colData.length} หลัก{" "}
                  {Math.max(...colData.map((row) => row.length))} แถว
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
                    <th>แถวที่นำเข้า</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(vehicleFileHeader).map((f, index) => {
                    const headerIndex = f.fileCol;

                    const headerName =
                      headerIndex !== DEFAULT_HEADER_INDEX
                        ? fileHeader[headerIndex]
                        : "";

                    const checkList: number[] = [];

                    Object.values(vehicleFileHeader).forEach((item) => {
                      if (item.fileCol !== DEFAULT_HEADER_INDEX) {
                        checkList.push(item.fileCol);
                      }
                    });

                    const changeHeader = (val: string) => {
                      const nextIndex = fileHeader.indexOf(val);

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
                            subString={20}
                            isOnTop={0.6}
                            checkList={checkList}
                            activeFontColor="var(--s-500)"
                            activeBackground="var(--s-300)"
                            activeBorder="0.125rem solid var(--s-500)"
                            placeholder="ยังไม่ได้เลือกค่า"
                            value={headerName}
                            onChange={(value) => changeHeader(value)}
                            options={fileHeader}
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
            {ishasErrorFile && (
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
                      พบข้อมูล{" "}
                      {
                        Object.values(vehicleFileHeader).filter(
                          (item) => item.errorRows.length > 0,
                        ).length
                      }{" "}
                      ประเภทเกิดข้อผิดพลาดในการแปลงไฟล์
                      กรุณาแก้ไขข้อผิดพลาดแล้วลองใหม่อีกครั้ง
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.erorrTableWarpper}>
              {ishasErrorFile && (
                <p className={styles.errorTitle}>ข้อมูลข้อผิดพลาด</p>
              )}
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
                          errorRows: errorRows,
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
        <button onClick={() => onClose()} type="button">
          <IconSvgMono
            src="/icon/cross.svg"
            size={12}
            color="var(--p-500)"
          ></IconSvgMono>
        </button>
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
            disabled={state == 0}
            style={{ color: state == 0 ? "var(--p-300)" : "var(--p-700)" }}
            onClick={() => handlePreviousState()}
          >
            ย้อนกลับ
          </button>
          <button
            onClick={() => {
              handleNextState();
            }}
            type="button"
            className={`${styles.confirm} ${state == 0 || ishasErrorFile ? styles.isDisabled : ""}`}
          >
            {state == 2 ? "ยืนยัน" : "ต่อไป"}
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
  const Error_PREVIEW = 3;
  const errorMoreLength = errorRows.length - (Error_PREVIEW + 1);

  useEffect(() => {
    if (!regex) return;
    const errorRowsTemp: number[] = [];
    for (let i = 1; i < data?.length; i++) {
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
            {errorRows.length} ข้อผิดพลาด:
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
            if (index > Error_PREVIEW) return;
            return (
              <div className={styles.errorTableFile} key={index}>
                <div className={styles.errorTableFileRow}>แถวที่ {err}</div>
                <p className={styles.errorTableFileContent}>
                  {data[err] == "" ? `""` : data[err]}
                </p>
              </div>
            );
          })}
          {errorMoreLength > 0 ? (
            <p className={styles.errorTableMore}>
              และอีก +{errorMoreLength} แถว
            </p>
          ) : (
            <p className={styles.errorTableMore}></p>
          )}
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
          const isError = tableInfo.some((item) => {
            if (item.errorRows.includes(index + 1)) {
              return true;
            }
          });
          if (index < colData[0].length - 1)
            return (
              <div
                className={`${styles.contentPreviewIndex} ${isError ? styles.isError : ""}`}
                key={index}
              >
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
                {colData[row.fileCol]?.map((c, colIndex) => {
                  const isError = row.errorRows.includes(colIndex);
                  if (colIndex < PREVIEW_LENGTH + 1 && colIndex != 0)
                    return (
                      <div
                        key={colIndex}
                        className={`${styles.contentPreview} ${isError ? styles.isError : ""}`}
                      >
                        {isError ? "! " : ""}
                        {c == "" ? `""` : c}
                      </div>
                    );
                })}
              </div>
            );
        })}
      </div>
    </div>
  );
};
