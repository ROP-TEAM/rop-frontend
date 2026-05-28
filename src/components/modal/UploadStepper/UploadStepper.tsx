import { FileDragInput } from "@/components/form/FileDragInput/FileDragInput";
import { SelectInput } from "@/components/form/SelectInput/SelectInput";
import IconSvgMono from "@/components/Icon/SvgIcon";
import { SkillPill } from "@/components/ui/SkillPill/SkillPill";
import { StepperControl } from "@/components/ui/StepperControl/StepperControl";
import { StepperProp } from "@/components/ui/StepperControl/StepperControl.types";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./UploadStepper.module.scss";
import {
  ErrorTableProps,
  UploadStepperProps,
  PreviewTableProps,
} from "./UploadStepper.types";

const STEPPER: StepperProp[] = [
  { value: 0, label: "เลือกไฟล์" },
  { value: 1, label: "จัดการ" },
  { value: 2, label: "ตรวจสอบ" },
];
const ACEEPTFILE = [".csv"];

export const UploadStepper = ({
  title,
  fileExample,
  description,
  skillPill,
  file,
  setFile,
  mappedColData,
  setMappedColData,
  headerRule,
  handleCreate,
  onClose,
}: UploadStepperProps) => {
  const [state, setState] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [errorIndex, setErrorIndex] = useState<number[][]>(
    Array.from({ length: headerRule.length }, () => []),
  );

  const [rawColData, setRawColData] = useState<string[][]>([]);

  const [header, setHeader] = useState<string[]>([]);

  const ishasErrorFile = errorIndex.some((e) => e.length > 0);

  const parseCSVRow = (row: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < row.length; i++) {
      const char = row[i];

      if (char === '"') {
        inQuotes = !inQuotes;
        continue;
      }

      if (char === "," && !inQuotes) {
        result.push(current);
        current = "";
        continue;
      }

      current += char;
    }

    result.push(current);
    return result;
  };

  const parseCSVCol = (rows: string[][]): string[][] => {
    if (rows[0].length === 0) return [];
    const colCount = rows[0].length;

    const tempRawColData: string[][] = Array.from(
      { length: rows[0].length },
      () => [],
    );
    for (let row = 0; row < rows.length; row++) {
      for (let col = 0; col < colCount; col++) {
        tempRawColData[col].push(rows[row][col] ?? "");
      }
    }
    return tempRawColData;
  };

  const handleUploadFile = (file: File) => {
    setMappedColData(Array.from({ length: headerRule.length }, () => []));
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
      const parsedRows = rows.map(parseCSVRow);
      const parsedRawCol = parseCSVCol(parsedRows);
      const headers = parsedRows[0];

      const tempMappedColData: string[][] = Array.from(
        { length: headerRule.length },
        () => [],
      );
      for (let h = 0; h < headers.length; h++) {
        const ruleIndex = headerRule.findIndex((r) =>
          r.label.includes(headers[h].trim()),
        );
        if (ruleIndex !== -1) {
          tempMappedColData[ruleIndex] = [...(parsedRawCol[h] ?? [])];
        }
      }

      setMappedColData(tempMappedColData);
      setRawColData(parsedRawCol);
      setHeader(headers);
      setFile(file);
      setError("");
      setState(1);
    };

    reader.readAsText(file);
  };

  const getVehicleDownloadFileExam = () => {
    if (!fileExample || fileExample?.length == 0) return;

    const escapeCSV = (value: string) => `"${value.replace(/"/g, '""')}"`;

    const csvContent = [
      header.map(escapeCSV).join(","),
      ...fileExample.map((row) => row.map(escapeCSV).join(",")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "vehicle-template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleNextState = () => {
    if (state === 1) {
      if (
        headerRule.some(
          (r, index) => r.require && mappedColData[index].length === 0,
        )
      ) {
        setError("เลือกข้อมูลให้ครบถ้วน");
        return;
      }
      setState(2);
      setError("");
    }
    if (state === 2 && !ishasErrorFile) {
      handleCreate();
    }
  };

  const handlePreviousState = () => {
    if (state === 0) return;
    setState((prev) => prev - 1);
  };

  const renderContent = () => {
    switch (state) {
      case 0:
        return (
          <div className={styles.content}>
            <FileDragInput onChange={handleUploadFile} />
            <div className={styles.fileInfo}>
              <p>ประเภทไฟล์ที่รองรับ {ACEEPTFILE.join(",")}</p>
              <p>ขนาดไฟล์สูงสุด 201 แถว</p>
            </div>
            {fileExample && (
              <div className={styles.fileTemplate}>
                <div>
                  <div className={styles.fileTemplateHeader}>
                    <Image
                      src={"/flat/excel.svg"}
                      alt="excel"
                      width={20}
                      height={20}
                    />
                    <h3 className={styles.text}>ตัวอย่างไฟล์ที่ถูกต้อง</h3>
                  </div>
                  <p className={styles.fileTempalateDescription}>
                    สคริปต์ลาเต้ฟรุตชะโนด สี่แยกชัวร์คูลเลอร์จังโก้ซานตาคลอส
                    วิกเพลย์บอยพลานุภาพ
                  </p>
                </div>
                <button
                  className={styles.download}
                  onClick={getVehicleDownloadFileExam}
                >
                  ดาวโหลดไฟล์
                </button>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className={styles.manage}>
            <div className={styles.fileWrapper}>
              <div className={styles.fileWrapperInfo}>
                <SkillPill
                  title={
                    file?.name.split(".")[1]
                      ? `.${file.name.split(".").pop()}`
                      : "csv"
                  }
                  color="var(--g-500)"
                />
                {(() => {
                  if (!file?.name) return null;
                  const name =
                    file.name.length > 15
                      ? file.name.substring(0, 15) + "..."
                      : file.name;
                  return <h4>{name}</h4>;
                })()}
                <p className={styles.fileCount}>
                  {rawColData.length} หลัก{" "}
                  {rawColData.length > 0
                    ? Math.max(...rawColData.map((row) => row.length))
                    : 0}{" "}
                  แถว
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
                  {headerRule.map((f, index) => {
                    const optionHeader = header.map((h) => ({
                      label: h,
                      value: h,
                    }));

                    const changeHeaderCol = (value: string) => {
                      const rawColIndex = header.indexOf(value);
                      setMappedColData((prev) =>
                        prev.map((c) => (c[0] === value ? [] : c)),
                      );
                      setMappedColData((prev) => {
                        const temp = [...prev];
                        temp[index] = [...(rawColData[rawColIndex] ?? [])];
                        return temp;
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
                            subString={16}
                            isOnTop={0.65}
                            activeFontColor="var(--s-500)"
                            activeBackground="var(--s-300)"
                            activeBorder="0.125rem solid var(--s-500)"
                            placeholder="ยังไม่ได้เลือกค่า"
                            value={mappedColData[index][0]}
                            onChange={changeHeaderCol}
                            options={optionHeader}
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
                  <IconSvgMono src="/icon/caution.svg" color="red" size={28} />
                  <div>
                    <h3 className={styles.cautionTitle}>
                      ตรวจพบข้อผิดพลาดในการนำเข้าไฟล์
                    </h3>
                    <p className={styles.cautionDescription}>
                      พบข้อมูล {errorIndex.filter((e) => e.length > 0).length}{" "}
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
              <div className={styles.errorTableCaution}>
                {mappedColData.map((col, index) => (
                  <ErrorTable
                    require={headerRule[index].require}
                    key={index}
                    errorRows={errorIndex[index]}
                    onValid={(errorRows) =>
                      setErrorIndex((prev) =>
                        prev.map((e, idx) => (index === idx ? errorRows : e)),
                      )
                    }
                    description={headerRule[index].description}
                    systemHeader={headerRule[index].label}
                    data={col}
                    regex={headerRule[index].regex ?? undefined}
                  />
                ))}
              </div>
            </div>

            <p className={styles.errorTitle}>ตัวอย่างข้อมูลนำเข้า</p>
            <PreviewTable
              tableInfo={mappedColData
                .filter((col) => col.length > 0)
                .map((col, index) => ({
                  content: col,
                  label: headerRule[index].label,
                  errorRows: errorIndex[index],
                }))}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.vehicleUpload}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.headerTitle}>
            <h2 className={styles.title}>{title}</h2>
            {skillPill && (
              <SkillPill
                color={skillPill?.color}
                title={skillPill?.title ?? ""}
              />
            )}
          </div>
          {description && <p>{description}</p>}{" "}
        </div>
        <button onClick={onClose} type="button">
          <IconSvgMono src="/icon/cross.svg" size={12} color="var(--p-500)" />
        </button>
      </div>

      <StepperControl value={state} stepper={STEPPER} />

      <div className={styles.contentAction}>{renderContent()}</div>

      <div className={styles.footer}>
        {error && <p className={styles.error}>เกิดข้อผิดพลาด: {error}</p>}
        <div className={styles.action}>
          <button
            type="button"
            className={styles.cancel}
            disabled={state === 0}
            style={{ color: state === 0 ? "var(--p-300)" : "var(--p-700)" }}
            onClick={handlePreviousState}
          >
            ย้อนกลับ
          </button>
          <button
            onClick={handleNextState}
            type="button"
            className={`${styles.confirm} ${
              state === 0 || (state === 2 && ishasErrorFile)
                ? styles.isDisabled
                : ""
            }`}
          >
            {state === 2 ? "ยืนยัน" : "ต่อไป"}
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
  require: isRequired,
  onValid,
}: ErrorTableProps & { require?: boolean }) => {
  const ERROR_PREVIEW = 3;
  const errorMoreLength = (errorRows?.length ?? 0) - (ERROR_PREVIEW + 1);

  useEffect(() => {
    if (!regex || !data) return;

    const errorRowsTemp: number[] = [];

    for (let i = 1; i < data.length; i++) {
      const value = data[i]?.trim();

      if (!isRequired && value === "") continue;

      if (!regex.test(value)) {
        errorRowsTemp.push(i);
      }
    }

    if (JSON.stringify(errorRowsTemp) !== JSON.stringify(errorRows)) {
      onValid(errorRowsTemp);
    }
  }, [data, regex, isRequired, errorRows, onValid]);

  if (errorRows.length === 0) return null;

  return (
    <div className={styles.errorTable}>
      <div className={styles.errorTableInfo}>
        <h3 className={styles.errorTableName}>{systemHeader}</h3>
        <div className={styles.errorTableReview}>
          <p className={styles.errorTableDetail}>
            {errorRows.length} ข้อผิดพลาด:
          </p>
          <h4 className={styles.errorTableColName}>
            {data[0]?.replace(/"/g, "")}
          </h4>
        </div>
      </div>
      <div className={styles.errorTableContent}>
        <p className={styles.errorTableRequire}>{description}</p>
        <div className={styles.errorTableRows}>
          {errorRows.map((err, index) => {
            if (index > ERROR_PREVIEW) return null;
            return (
              <div className={styles.errorTableFile} key={index}>
                <div className={styles.errorTableFileRow}>แถวที่ {err}</div>
                <p className={styles.errorTableFileContent}>
                  {data[err] === "" ? `""` : data[err]}
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

export const PreviewTable = ({ tableInfo }: PreviewTableProps) => {
  const PREVIEW_LENGTH = 5;

  return (
    <div className={styles.previewTable}>
      <div>
        <p className={styles.headerIndex}>#</p>
        {Array.from({ length: PREVIEW_LENGTH }).map((_, index) => {
          const isError = tableInfo.some((item) =>
            item.errorRows.includes(index + 1),
          );
          if (index < (tableInfo[0].content.length ?? 0) - 1)
            return (
              <div
                className={`${styles.contentPreviewIndex} ${isError ? styles.isError : ""}`}
                key={index}
              >
                {index + 1}
              </div>
            );
          return null;
        })}
      </div>
      <div className={styles.headerSystem}>
        {tableInfo.map((row, rowIndex) => (
          <div key={rowIndex}>
            <p className={styles.headerChild}>{row.label}</p>
            {row.content.map((c, colIndex) => {
              const isError = row.errorRows.includes(colIndex);
              if (colIndex < PREVIEW_LENGTH + 1 && colIndex !== 0)
                return (
                  <div
                    key={colIndex}
                    className={`${styles.contentPreview} ${isError ? styles.isError : ""}`}
                  >
                    {isError ? "! " : ""}
                    {c === "" ? `""` : c}
                  </div>
                );
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
