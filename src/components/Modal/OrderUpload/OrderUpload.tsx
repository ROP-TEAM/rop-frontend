import { FileDragInput } from "@/components/form/FileDragInput/FileDragInput";
import { SelectInput } from "@/components/form/SelectInput/SelectInput";
import IconSvgMono from "@/components/Icon/SvgIcon";
import { SkillPill } from "@/components/ui/SkillPill/SkillPill";
import { StepperControl } from "@/components/ui/StepperControl/StepperControl";
import { StepperProp } from "@/components/ui/StepperControl/StepperControl.types";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./OrderUpload.module.scss";
import {
  ErrorTableProps,
  OrderUploadProps,
  PreviewTableProps,
  OrderFileHeader,
} from "./OrderUpload.types";
import { OrderUploadStateProps } from "./OrderUpload.types";
const DEFAULT_HEADER_INDEX = -1;

const OrderUploadState = ({
  state,
  file,
  colData,
  fileHeader,
  orderFileHeader,
  ishasErrorFile,
  setState,
  setOrderFileHeader,
  handleUploadFile,
}: OrderUploadStateProps) => {
  const ACEEPTFILE = [".csv"];
  const getDownloadFileExam = () => {
    const header = Object.values(orderFileHeader).map((item) => item.label);
    const row = [
      [
        "SOT001",
        "ส่งสินค้าแช่เย็นไปสาขา A",
        "120",
        "ของเย็น",
        "08:00",
        "17:00",
        '"13.7563,100.5018"',
        "15",
        "สูง",
      ],
    ];
    const csvContent = [
      header.join(","),
      ...row.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "order-template.csv";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
            <button
              className={styles.download}
              onClick={() => getDownloadFileExam()}
            >
              ดาวโหลดไฟล์
            </button>
          </div>
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
                    : ".csv"
                }
                color="var(--g-300)"
              ></SkillPill>
              {(() => {
                if (!file?.name) return null;
                const name =
                  file.name.length > 15
                    ? file.name.substring(0, 15) + "..."
                    : file.name;
                return <h4>{name}</h4>;
              })()}
              <p className={styles.fileCount}>
                {colData.length} หลัก{" "}
                {colData.length > 0
                  ? Math.max(...colData.map((row) => row.length))
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
                {Object.values(orderFileHeader).map((f, index) => {
                  const headerIndex = f.fileCol;
                  const headerName =
                    headerIndex !== DEFAULT_HEADER_INDEX
                      ? fileHeader[headerIndex]
                      : "";

                  const checkList: number[] = [];
                  Object.values(orderFileHeader).forEach((item) => {
                    if (item.fileCol !== DEFAULT_HEADER_INDEX) {
                      checkList.push(item.fileCol);
                    }
                  });

                  const changeHeader = (val: string) => {
                    const nextIndex = fileHeader.indexOf(val);

                    setOrderFileHeader((prev) => {
                      const updated = { ...prev };

                      Object.keys(updated).forEach((key) => {
                        const typedKey = key as keyof OrderFileHeader;

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

                      const fieldKey = f.value as keyof OrderFileHeader;
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
                      Object.values(orderFileHeader).filter(
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
            {Object.values(orderFileHeader).map((f, index) => {
              if (f.fileCol === -1) return null;
              return (
                <ErrorTable
                  key={index}
                  errorRows={f.errorRows}
                  onValid={(errorRows) =>
                    setOrderFileHeader((prev) => ({
                      ...prev,
                      [f.value as keyof OrderFileHeader]: {
                        ...prev[f.value as keyof OrderFileHeader],
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
            tableInfo={Object.values(orderFileHeader).map((v) => {
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
    default:
      return null;
  }
};

// 2. Component หลัก (OrderUpload)
export const OrderUpload = ({
  orderFileHeader,
  colData,
  file,
  setFile,
  setColData,
  setOrderFileHeader,
  handleCreateOrder,
  onClose,
}: OrderUploadProps) => {
  const [state, setState] = useState<number>(0);
  const [fileHeader, setFileHeader] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const STEPPER: StepperProp[] = [
    { value: 0, label: "เลือกไฟล์" },
    { value: 1, label: "จัดการ" },
    { value: 2, label: "ตรวจสอบ" },
  ];

  const ishasErrorFile = Object.values(orderFileHeader).some(
    (item) => item.errorRows.length > 0,
  );

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

  const handleUploadFile = (file: File) => {
    setOrderFileHeader((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        const typedKey = key as keyof OrderFileHeader;
        updated[typedKey].fileCol = -1;
      });
      return updated;
    });

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

      const headers = parsedRows[0];
      const colCount = headers.length;
      const normalizedRows = parsedRows.map((row) => {
        if (row.length < colCount) {
          return [...row, ...Array(colCount - row.length).fill("")];
        }
        return row;
      });

      const tempColData: string[][] = [];
      const updatedVehicleFileHeader = structuredClone(orderFileHeader);

      for (let i = 0; i < colCount; i++) {
        tempColData.push(normalizedRows.map((row) => row[i] ?? ""));

        const header = headers[i].trim();
        for (const v of Object.values(updatedVehicleFileHeader)) {
          if (header.includes(v.label)) {
            v.fileCol = i;
          }
        }
      }

      setOrderFileHeader(updatedVehicleFileHeader);
      setFileHeader(headers);
      setColData(tempColData);
      setFile(file);
      setError("");
      setState(1);
    };

    reader.readAsText(file);
  };

  const handleNextState = () => {
    if (state === 1) {
      if (
        orderFileHeader.timeWindowStart?.fileCol === -1 ||
        orderFileHeader.timeWindowEnd?.fileCol === -1 ||
        orderFileHeader.location?.fileCol === -1 ||
        orderFileHeader.capacity?.fileCol === -1 ||
        orderFileHeader.name?.fileCol === -1 ||
        orderFileHeader.serviceTime?.fileCol === -1
      ) {
        setError("เลือกข้อมูลให้ครบถ้วน");
        return;
      }
      setState(2);
      setError("");
    }
    if (state === 2 && !ishasErrorFile) {
      handleCreateOrder();
    }
  };

  const handlePreviousState = () => {
    if (state === 0) return;
    setState((prev) => prev - 1);
  };

  return (
    <div className={styles.vehicleUpload}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.headerTitle}>
            <h2 className={styles.title}>อัปโหลดไฟล์</h2>
            <SkillPill color="#E36A6A" title="ออร์เดอร์" />
          </div>
          <p>สคริปต์ลาเต้ฟรุตชะโนด สี่แยกชัวร์คูลเลอร์จังโก้ซานตาคลอส</p>
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
        <OrderUploadState
          state={state}
          file={file}
          colData={colData}
          fileHeader={fileHeader}
          orderFileHeader={orderFileHeader}
          ishasErrorFile={ishasErrorFile}
          setState={setState}
          setOrderFileHeader={setOrderFileHeader}
          handleUploadFile={handleUploadFile}
        />
      </div>

      <div className={styles.footer}>
        {error && <p className={styles.error}>เกิดข้อผิดพลาด: {error}</p>}
        <div className={styles.action}>
          <button
            type="button"
            className={styles.cancel}
            disabled={state === 0}
            style={{ color: state === 0 ? "var(--p-300)" : "var(--p-700)" }}
            onClick={() => handlePreviousState()}
          >
            ย้อนกลับ
          </button>
          <button
            onClick={handleNextState}
            type="button"
            className={`${styles.confirm} ${state === 0 || (state === 2 && ishasErrorFile) ? styles.isDisabled : ""}`}
          >
            {state === 2 ? "ยืนยัน" : "ต่อไป"}
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Component ย่อยอื่นๆ สำหรับแสดงผล Error และ Preview ตารางข้อมูล
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
    if (!regex || !data) return;
    const errorRowsTemp: number[] = [];
    for (let i = 1; i < data.length; i++) {
      if (!regex.test(data[i])) {
        errorRowsTemp.push(i);
      }
    }
    if (JSON.stringify(errorRowsTemp) !== JSON.stringify(errorRows)) {
      onValid(errorRowsTemp);
    }
  }, [data, regex]);

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
            if (index > Error_PREVIEW) return null;
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

export const PreviewTable = ({ tableInfo, colData }: PreviewTableProps) => {
  const PREVIEW_LENGTH = 5;
  if (!colData || colData.length === 0) return null;

  return (
    <div className={styles.previewTable}>
      <div>
        <p className={styles.headerIndex}>#</p>
        {Array.from({ length: PREVIEW_LENGTH }).map((_, index) => {
          const isError = tableInfo.some((item) =>
            item.errorRows.includes(index + 1),
          );
          if (index < colData[0].length - 1)
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
        {tableInfo.map((row, rowIndex) => {
          if (row.fileCol !== -1)
            return (
              <div key={rowIndex}>
                <p className={styles.headerChild}>{row.label}</p>
                {colData[row.fileCol]?.map((c, colIndex) => {
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
            );
          return null;
        })}
      </div>
    </div>
  );
};
