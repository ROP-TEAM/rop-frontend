"use client";
import { useState } from "react";
import { CardOrderProps } from "./CardOrder.types";
import styles from "./CardOrder.module.scss";
export const CardOrder = ({ title, description }: CardOrderProps) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div
      className={styles.wrapper}
      onClick={() => setShowInfo((prev) => !prev)}
    >
      <section className={styles.header}>
        <h3>{title}</h3>
        <p>{description}</p>
      </section>
      {showInfo && <section>more</section>}
    </div>
  );
};
