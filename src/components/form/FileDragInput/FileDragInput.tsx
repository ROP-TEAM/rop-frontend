import { FileDragInputProps } from "./FileDragInput.types";
import styles from "./FileDragInput.module.scss";
import { useState, useRef } from "react";
import Image from "next/image";
export const FileDragInput = ({
  accept = "*",
  onChange,
}: FileDragInputProps) => {
  const [isDraggin, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleFilePicker = () => {
    inputRef.current?.click();
  };

  const handleDropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    const isCsv = droppedFile.name.toLowerCase().endsWith(".csv");

    
    if (!droppedFile || !isCsv) {
      setIsDragging(false);
      return;
    }
    onChange(droppedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      setIsDragging(false);
    }
  };
  return (
    <div
      onDrop={handleDropFile}
      onClick={() => handleFilePicker()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        background: isDraggin ? "var(--s-100)" : "transparent",
        border: isDraggin
          ? "0.125rem dashed var(--s-300)"
          : "0.125rem dashed var(--p-200)",
      }}
      className={styles.dragFile}
    >
      <input
        ref={inputRef}
        onChange={handleFileChange}
        hidden
        accept={accept}
        type="file"
      />
      <div className={styles.content}>
        <Image
          src={"/flat/upload.svg"}
          width={110}
          height={110}
          alt="upload"
        ></Image>
        <p
          className={styles.contentText}
          style={{ color: isDraggin ? "var(--p-500)" : "var(--p-300)" }}
        >
          {isDraggin ? "วางไฟล์ที่นี่" : "ลากและวาง หรือกดเพื่ออัพโหลดไฟล์"}
        </p>
      </div>
    </div>
  );
};
