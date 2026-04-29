import { CardOrder } from "../CardOrder/CardOrder";
import styles from "./OrderContainer.module.scss";
export const OrderContainer = () => {
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h3>มหากาพย์น้ำแข็งลุกป๊อก</h3>
        <div className={styles.usageCapacity}>
          <div className={styles.usageCapacityHeader}>
            <p>ความจุน้ำหนัก</p>
            <p>234 / 456</p>
          </div>
          <div className={styles.maxCapacity}></div>
          <div className={styles.usageCapacityMax}>
            <div
              style={
                {
                  "--width-scale": `${(234 / 456) * 100}%`,
                } as React.CSSProperties
              }
              className={styles.usageCapacityCurrent}
            ></div>
          </div>
        </div>
      </section>
      <section>
        <CardOrder
          title={"IDX04967H"}
          description="น้ำโค้ก 15 แพ็ค , น้ำอัดลม 75 ขวด , เบียร์ 16ลัง,ดีน่าโปรตีนนมผงแบบลัง 15 แพ็ค"
        />
      </section>
    </div>
  );
};
