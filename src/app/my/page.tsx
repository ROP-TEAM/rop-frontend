"use client";
import Image from "next/image";
import styles from "./my.module.scss";
import { Topbar } from "@/components/navigation/Topbar/Topbar";
import { useCreatePlanMutation } from "@/app/features/plan/api/planApi";
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
  const [createPlan,{ isLoading, error, data}] = useCreatePlanMutation();
  const handleCreatePlan = async () => {
    try {
      const result = await createPlan({
        name: "",
        plan_date: new Date().toISOString(),
      }).unwrap();
      console.log(result);
    } catch (err) {      
      console.error("Failed to create plan:", err);
    }
  }

  return (
    <div>
      <Topbar></Topbar>
      <section>
        <div className={styles.planContainer}>
          <h2 className={styles.title}>แนะนำสำหรับคุณ</h2>
          <div className={styles.tipContainer}>
            <div className={styles.tip} onClick={handleCreatePlan}>
              <Image
                className={styles.image}
                src={"/cover/add-plan.svg"}
                alt="csv"
                width={500}
                height={500}
              ></Image>
              <h4 className={styles.text}>+ เพิ่มงานใหม่</h4>
            </div>
            <div className={styles.tip}>
              <Image
                className={styles.image}
                src={"/cover/csv-teach.svg"}
                alt="csv"
                width={200}
                height={200}
              ></Image>
              <h4 className={styles.text}>
                เพิ่มออเดอร์ด้วย .csv และวิธีปรับแต่งแก้ไขข้อมูลอย่างมือโปร
              </h4>
            </div>
            <div className={styles.tip}>
              <Image
                className={styles.image}
                src={"/cover/timeline.svg"}
                alt="csv"
                width={500}
                height={500}
              ></Image>
              <h4 className={styles.text}>
                ส่อง Timeline อย่างเซียน กุมกำไรอย่างงาม
              </h4>
            </div>
          </div>
          <h3 className={styles.today}>ภายในวันนี้</h3>
          <div className={styles.workContainer}>
            {mockPlans.map((m, idm) => {
              return (
                <div key={idm} className={styles.work}>
                  <div className={styles.title}>
                    <h3 className={styles.name}>{m.planName}</h3>
                    <div className={styles.info}>
                      <p className={styles.infoText}>รถ {m.cars.length} คัน</p>
                      <p className={styles.infoText}>{m.ordercount} ออเดอร์</p>
                    </div>
                  </div>
                  <div className={styles.status}>
                    <p className={styles.statusText}>
                      {Math.floor(Math.random() * 10) % 2 == 0
                        ? "เสร็จสิ้น"
                        : "อยู่ระหว่างจัด"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export default My;
