import React from "react";
import styles from "./Modal.module.scss";
import { ModalProps } from "./Modal.types";

export const Modal = ({
  children,
  isActive,
  marginTop = "10rem",
  onClose,
}: ModalProps) => {
  if (!isActive) return;
  return (
    <div className={styles.background} onClick={() => onClose()}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ "--margin-Top": marginTop } as React.CSSProperties}
        className={styles.modal}
      >
        {children}
      </div>
    </div>
  );
};
