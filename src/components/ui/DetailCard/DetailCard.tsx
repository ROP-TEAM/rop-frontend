import IconSvgMono from "@/components/Icon/SvgIcon";
import styles from "./DetailCard.module.scss";
import { DetailCardProps } from "./DetailCard.types";
export const DetailCard = ({ handleCloseDetail }: DetailCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.control}>
        <div className={styles.info}>
          <button onClick={() => handleCloseDetail()}>
            <IconSvgMono
              src="/icon/cross.svg"
              size={12}
              color="var(--p-700)"
            ></IconSvgMono>
          </button>
          <h4 className={styles.editAt}>แก้ไขล่าสุด 05-03-2026</h4>
        </div>
        <div></div>
      </div>
    </div>
  );
};
