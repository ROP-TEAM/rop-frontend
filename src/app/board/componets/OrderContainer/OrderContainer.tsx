import { CardOrder } from "../CardOrder/CardOrder";
import styles from "./OrderContainer.module.scss";
export const CardContainer = () => {
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h3>มหากาพย์น้ำแข็งลุกป๊อก</h3>
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
