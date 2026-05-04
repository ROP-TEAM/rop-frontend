import IconSvgMono from "@/components/Icon/SvgIcon";
import styles from "./DetailCard.module.scss";
import { useDispatch } from "react-redux";
import { detailClose } from "@/app/features/sidePopup/sidePopupSlide";
import { SegmentControl } from "../SegmentControl/SegmentControl";
import { NumberInput } from "@/components/form/NumberInput/NumberInput";
import React, { useState } from "react";
import { TextInput } from "@/components/form/TextInput/TextInput";
import { SegmentProp } from "../SegmentControl/SegmentControl.types";
export const DetailCard = () => {
  const [detailState, setDetailState] = useState("property");
  const [isShowOverview, setIsShowOverview] = useState(true);
  const [isShowOrder, setIsShowOrder] = useState(true);
  const [maxTask, setMaxTask] = useState<number>(0);
  const segments: SegmentProp[] = [
    {
      value: "property",
      label: "คุณสมบัติ",
    },
    {
      value: "planInfo",
      label: "แผนเดินรถ",
    },
  ];
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.control}>
        <div className={styles.info}>
          <button onClick={() => dispatch(detailClose())}>
            <IconSvgMono
              src="/icon/cross.svg"
              size={12}
              color="var(--p-700)"
            ></IconSvgMono>
          </button>
          <h4 className={styles.editAt}>แก้ไขล่าสุด 05-03-2026</h4>
        </div>
      </div>
      <div className={styles.detail}>
        <div className={styles.detailHeader}>
          <div className={styles.imageContainer}></div>
          <div>
            <h2>สมชายแซ่ตั้งรถขนของเย็น</h2>
            <div className={styles.detailCarContainer}>
              <div className={styles.detailCar}>
                <p>หมาเลขทะเบียน</p>
                <h4>กขค 123</h4>
              </div>
              <div className={styles.detailCar}>
                <p>รุ่น</p>
                <h4>TOYOTA V OAT</h4>
              </div>
            </div>
          </div>
        </div>
        <SegmentControl
          segments={segments}
          value={detailState}
          onChange={setDetailState}
        ></SegmentControl>
        <section className={styles.body}>
          {detailState == "property" ? (
            <div className={styles.property}>
              <div className={styles.caution}>
                <div className={styles.bar}></div>
                <IconSvgMono
                  size={60}
                  src="/icon/caution.svg"
                  color="var(--s-500)"
                ></IconSvgMono>
                <p className={styles.cautionText}>
                  การแก้ไขข้อมูลในหน้าต่างนี้จะใช้เป็นข้อมูลเพียงการจัดรอบรถครั้งนี้เท่านั้น
                </p>
                <IconSvgMono
                  size={20}
                  src="/icon/cross.svg"
                  color="var(--s-500)"
                ></IconSvgMono>
              </div>
              <div className={styles.propertyContent}>
                <h3>คุณสมบัติ</h3>
                <div className={styles.propertyInfo}>
                  <div>
                    <p className="">เวลาทำการ</p>
                    <h3>09.00 น. - 18.00 น.</h3>
                  </div>
                  <div>
                    <p className="">เวลาพักทำการ</p>
                    <h3>09.00 น. - 18.00 น.</h3>
                  </div>
                  <NumberInput
                    value={maxTask}
                    onChange={setMaxTask}
                    color="var(--p-800)"
                    labelColor="var(--p-500)"
                    labelSize="0.725rem"
                    label="จำนวนออเดอร์สูงสุด"
                  ></NumberInput>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.detailContent}>
              <div>
                <div className={styles.title}>
                  <h3>ภาพรวม</h3>
                  <button
                    onClick={() => setIsShowOverview((prev) => !prev)}
                    type="button"
                  >
                    <IconSvgMono
                      size={20}
                      color="var(--p-500)"
                      src="/icon/scale-down.svg"
                    ></IconSvgMono>
                  </button>
                </div>
                {isShowOverview && (
                  <div className={styles.overviewContent}>
                    <div className={styles.content}>
                      <div className={styles.capacityTitle}>
                        <p>ความจุน้ำหนัก</p>
                        <h4 className={styles.capacityPercent}>
                          {((123 / 456) * 100).toFixed(1)}%
                        </h4>
                      </div>
                      <div
                        className={styles.maxCapacity}
                        style={
                          {
                            "--capacityRadio": `${(123 / 456) * 100}%`,
                          } as React.CSSProperties
                        }
                      ></div>
                      <p>123 กก./456 กก.</p>
                    </div>
                    <div className={styles.content}>
                      <p>ระยะเวลารวม</p>
                      <h4>11 ชั่วโมง 2 นาที</h4>
                    </div>
                    <div className={styles.content}>
                      <p>ระยะทางรวม</p>
                      <h4>{40.5} กก.</h4>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.order}>
                <div className={styles.title}>
                  <h3>ออเดอร์ที่บรรทุก</h3>
                  <button
                    onClick={() => setIsShowOrder((prev) => !prev)}
                    type="button"
                  >
                    <IconSvgMono
                      size={20}
                      color="var(--p-500)"
                      src="/icon/scale-down.svg"
                    ></IconSvgMono>
                  </button>
                </div>

                <div className={styles.orderCard}>
                  <div>
                    <h3>#ID1567IO45</h3>
                  </div>
                  <p className={styles.note}>
                    น้ำโค้ก 15 แพ็ค , น้ำอัดลม 75 ขวด , เบียร์
                    16ลัง,ดีน่าโปรตีนนมผงแบบลัง 15 แพ็ค
                  </p>
                  <div className={styles.orderCardFooter}>
                    <div className={styles.orderCardFooterRight}>
                      <div className={styles.iconContainer}>
                        <IconSvgMono
                          color="var(--s-500)"
                          size={20}
                          src="/icon/clock-people.svg"
                        ></IconSvgMono>
                        <p className={styles.travelTime}>15 นาที</p>
                      </div>
                      <div className={styles.iconContainer}>
                        <IconSvgMono
                          color="var(--p-500)"
                          size={20}
                          src="/icon/way.svg"
                        ></IconSvgMono>
                        <p>32.7 กก. </p>
                      </div>
                    </div>
                    <div className={styles.iconContainer}>
                      <IconSvgMono
                        color="var(--p-500)"
                        size={20}
                        src="/icon/flag.svg"
                      ></IconSvgMono>
                      <p>16.09 น. </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
