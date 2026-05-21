import { IndicatorProps } from "./Indicator.types";
import styles from "./Indicator.module.scss";
export const Indicator = ({
  children,
  isActive,
  backgroundColor,
}: IndicatorProps) => {
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.indicator}></div>
    </div>
  );
};
