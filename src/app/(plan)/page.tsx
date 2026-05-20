"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Modal } from "@/components/Modal/Modal/Modal";
import styles from "./landing.module.scss";
import Image from "next/image";
import { useState } from "react";
import { VehicleUpload } from "@/components/Modal/VehicleUpload/VehicleUpload";
const Page = () => {
  const [isUploadVehicle, setIsUploadVehicle] = useState(false);
  const [isUploadOrder, setIsUploadOrder] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.titleInfo}>
          <h2 className={styles.titleText}>สร้างรอบรถของคุณ</h2>
          <div className={styles.titleDescription}>
            <span className={styles.normal}>
              เพียงแค่อัพโหลดไฟล์
              และสร้างรอบรถแบบที่คุณต้องการได้เพียงไม่กี่ขั้นตอน หรือ
            </span>
            <span className={styles.report}> พบปัญหาการใช้งาน</span>
          </div>
        </div>
        <button className={styles.titleAction}>ติดต่อเรา</button>
      </div>
      <section className={styles.uploadContainer}>
        <Modal
          isActive={isUploadVehicle}
          onClose={() => setIsUploadVehicle(false)}
        >
          <VehicleUpload></VehicleUpload>
        </Modal>
        <div className={styles.uploadContent}>
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src="/flat/vehicle.svg"
              alt="order"
              width={400}
              height={200}
            ></Image>
          </div>
          <div className={styles.uploadInfo}>
            <h2 className={styles.uploadText}>ไฟล์รถที่ใช้งาน</h2>
            <p className={styles.uploadDescription}>
              พุดดิ้งสปาคอมเมนท์ คอร์รัปชั่น คอนโทรล แอปพริคอทโชห่วยเอ๊าะ
              วืดรูบิคแคมเปญมาร์เก็ตติ้ง มาร์ชออสซี่ออโต้เหี่ยวย่นแบรนด์
            </p>
            <button className={styles.uploadAction} type="button">
              เลือกไฟล์
            </button>
          </div>
        </div>
        <div className={styles.uploadContent}>
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src="/flat/order.svg"
              alt="order"
              width={350}
              height={200}
            ></Image>
          </div>
          <div className={styles.uploadInfo}>
            <h2 className={styles.uploadText}>ไฟล์ออเดอร์ปลายทาง</h2>
            <p className={styles.uploadDescription}>
              พุดดิ้งสปาคอมเมนท์ คอร์รัปชั่น คอนโทรล แอปพริคอทโชห่วยเอ๊าะ
              วืดรูบิคแคมเปญมาร์เก็ตติ้ง มาร์ชออสซี่ออโต้เหี่ยวย่นแบรนด์
            </p>
            <button className={styles.uploadAction} type="button">
              เลือกไฟล์
            </button>
          </div>
        </div>
      </section>
      <section className={styles.actionSection}>
        <p className={styles.actionInfo}>
          ยังไม่มีไฟล์ — ต้องอัพโหลด {2} ไฟล์ให้เรียบร้อย
        </p>
        <button className={styles.sendAction}>จัดรอบรถ </button>
      </section>
    </div>
  );
};

export default Page;
