import IconSvgMono from "@/components/Icon/SvgIcon";
import styles from "./VehicleDelete.module.scss";
import { VehicleDeleteProps } from "./VehicleDelete.types";
export const VehicleDelete = ({ onClose }: VehicleDeleteProps) => {
  return (
    <div className={styles.vehicleDelete}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h3>ลบยานพาหนะ</h3>
          <p>แบดดีกรีวีน นู้ด แล็บ ไทม์ อพาร์ตเมนท์ลีกอพาร์ทเมนต์โทร</p>
        </div>
        <button
          type="button"
          onClick={() => onClose()}
          className={styles.action}
        >
          <IconSvgMono
            src="/icon/cross.svg"
            size={12}
            color="var(--p-500)"
          ></IconSvgMono>
        </button>
      </div>
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.cancel}
          onClick={() => onClose()}
        >
          ยกเลิก
        </button>
        <button type="button" className={styles.confirm}>
          ยืนยัน
        </button>
      </div>
    </div>
  );
};
