import styles from "./ProgressBar.module.scss";
import { BarProp } from "./type";

export const ProgressBar = ({ current, total = 3 }: BarProp) => {
  return (
    <div className={styles.container}>
      {Array.from({ length: total }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === current;

        return (
          <div
            key={index}
            className={`${styles.step} ${isActive ? styles.active : ""}`}
          />
        );
      })}
    </div>
  );
};
