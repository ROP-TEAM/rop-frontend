import { FileDragInputProps } from "./FileDragInput.types";
import styles from "./FileDragInput.module.scss";
import { useState, useRef } from "react";
export const FileDragInput = ({ file, onChange }: FileDragInputProps) => {
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
    }
  };
  return (
    <div
      onDrop={handleDropFile}
      onClick={() => handleFilePicker()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{ background: isDraggin ? "red" : "transparent" }}
      className={styles.dragFile}
    >
      <input
        ref={inputRef}
        onChange={handleFileChange}
        hidden
        accept=".csv"
        type="file"
      />
    </div>
  );
};
