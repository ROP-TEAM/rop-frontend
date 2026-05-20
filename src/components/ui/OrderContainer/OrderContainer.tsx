import IconSvgMono from "@/components/Icon/SvgIcon";
import { CardOrder } from "../CardOrder/CardOrder";
import styles from "./OrderContainer.module.scss";
import { useDispatch } from "react-redux";
import { detailOpen } from "@/app/features/sidePopup/sidePopupSlide";
export const OrderContainer = () => {
  const dispatch = useDispatch();
  return (
    <div
      className={styles.container}
      onClick={() => {
        dispatch(detailOpen());
      }}
    >
      <section className={styles.header}>
        <h3>มหากาพย์น้ำแข็งลุกป๊อก</h3>
        <div className={styles.detail}>
          <div className={styles.iconWithText}>
            <IconSvgMono
              src="/icon/paper-task.svg"
              color="var(--p-500)"
            ></IconSvgMono>
            <h2>4</h2>
          </div>
          <div className={styles.rightIcon}>
            <div className={styles.iconWithText}>
              <IconSvgMono
                src="/icon/node.svg"
                color="var(--p-500)"
              ></IconSvgMono>
              <h2>8.63 กม.</h2>
            </div>
            <div className={styles.iconWithText}>
              <IconSvgMono
                src="/icon/clock.svg"
                color="var(--p-500)"
              ></IconSvgMono>
              <h2>4ชั่วโมง 11 นาที</h2>
            </div>
          </div>
        </div>
        <div className={styles.usageCapacity}>
          <div className={styles.usageCapacityHeader}>
            <p>ความจุน้ำหนัก</p>
            <p>{((234 / 456) * 100).toFixed(1)}%</p>
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
          <p>234 กก./456 กก.</p>
        </div>
      </section>
      <section
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CardOrder
          title={"IDX04967H"}
          description="น้ำโค้ก 15 แพ็ค , น้ำอัดลม 75 ขวด , เบียร์ 16ลัง,ดีน่าโปรตีนนมผงแบบลัง 15 แพ็ค"
        />
      </section>
    </div>
  );
};
