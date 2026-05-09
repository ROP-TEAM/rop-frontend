import styles from "./my.module.scss";
import { Topbar } from "@/components/navigation/Topbar/Topbar";

const mockPlans = [
  {
    planName: "เส้นทางจัดส่งประจำวัน - โซนกรุงเทพเหนือ",
    cars: ["รถกระบะ กข-1234", "รถบรรทุก 4 ล้อ ฮฮ-5566", "รถจักรยานยนต์ รร-99"],
    ordercount: 45,
    lastestedit: new Date("2024-03-20T10:30:00"),
  },
  {
    planName: "แผนกระจายสินค้าด่วน (Express Delivery)",
    cars: ["รถกระบะตู้ทึบ นน-8888"],
    ordercount: 12,
    lastestedit: new Date("2024-03-21T08:15:00"),
  },
  {
    planName: "รอบบ่าย - พื้นที่สมุทรปราการ",
    cars: ["รถบรรทุก 6 ล้อ บบ-1122", "รถบรรทุก 6 ล้อ บบ-3344"],
    ordercount: 28,
    lastestedit: new Date("2024-03-21T13:45:00"),
  },
];

const My = () => {
  return (
    <div>
      <Topbar></Topbar>
      <section>
        <div className={styles.planContainer}>
          <h2 className={styles.title}>รอบรถทั้งหมด</h2>
          <div className={styles.header}>
            <div className={styles.name}>
              <p>ชื่อ</p>
              <div className={styles.nameContent}>
                {mockPlans.map((p, idp) => (
                  <div key={idp}>{p.planName}</div>
                ))}
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.vehicleCount}>
                <p>จำนวนรถ</p>
                <div className={styles.Content}>
                  {mockPlans.map((p, idp) => (
                    <div key={idp}>{p.cars.length}</div>
                  ))}
                </div>
              </div>

              <div className={styles.orderCount}>
                <p>จำนวนออเดอร์</p>
                <div className={styles.Content}>
                  {mockPlans.map((p, idp) => (
                    <div key={idp}>{p.ordercount}</div>
                  ))}
                </div>
              </div>

              <div className={styles.lastestEdit}>
                <p>แก้ไขล่าสุด</p>
                <div className={styles.Content}>
                  {mockPlans.map((p, idp) => {
                    const date = new Date(p.lastestedit);

                    const formatted = date.toLocaleDateString("th-TH", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                    return <div key={idp}>{formatted}</div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default My;
