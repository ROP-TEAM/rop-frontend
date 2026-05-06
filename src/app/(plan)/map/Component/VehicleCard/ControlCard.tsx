import IconSvgMono from "@/components/Icon/SvgIcon";
import styles from "./ControlCard.module.scss";
export const VehicleCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.name}>มหากาพย์น้ำแข็งลุกป๊อก</h3>
      </div>
      <div className={styles.body}>
        <h4 className={styles.model}>Model Name</h4>
        <div className={styles.detail}>
          <div className={styles.detailIcon}>
            <IconSvgMono
              size={20}
              className={styles.icon}
              src="/icon/clock.svg"
              color="var(--p-600)"
            ></IconSvgMono>
            <p>09.00น. - 18.00น.</p>
          </div>
          {/* <div className={styles.detailIcon}>
            <IconSvgMono
              size={20}
              className={styles.icon}
              src="/icon/cube.svg"
              color="var(--p-500)"
            ></IconSvgMono>
            <p>1.2ตัน</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};
