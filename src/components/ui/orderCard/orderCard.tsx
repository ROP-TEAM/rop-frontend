import { SkillInput } from "@/components/form/SkillInput/SkillInput";
import { SkillPillProps } from "@/components/ui/SkillPill/SkillPill.types";
import { NumberInput } from "@/components/form/NumberInput/NumberInput";
import { SelectInput } from "@/components/form/SelectInput/SelectInput";
import { LocationInput } from "@/components/form/LocationInput/LocationInput";
import React, { useEffect, useState } from "react";
import IconSvgMono from "@/components/Icon/SvgIcon";
import { TextInput } from "@/components/form/TextInput/TextInput";
import styles from "./orderCard.module.scss";
import { Location } from "@/types/api.types";
import { OrderBase } from "@/app/features/order/order.types";
import { orderCardProps } from "./orderCard.types";

const Priority = ({ p }: { p: number }) => {
  const priorityMapping = [
    {
      title: "ต่ำ",
      color: "#4CAF50",
    },
    {
      title: "ปานกลาง",
      color: "#FFC107",
    },
    {
      title: "สูง",
      color: "#FF9800",
    },
    {
      title: "สูงมาก",
      color: "#F44336",
    },
  ];
  return (
    <div className={styles.priority}>
      <p className={styles.priority_title}>ความสำคัญ</p>
      <h3
        className={styles.priority_bullet}
        style={{ color: priorityMapping[p].color } as React.CSSProperties}
      >
        • {priorityMapping[p].title}
      </h3>
    </div>
  );
};

export const OrderCard = ({
  id,
  name,
  description,
  capacity,
  skill,
  timeWindowStart,
  timeWindowEnd,
  desLatitude,
  serviceTime,
  desLongitude,
  type,
  priority,
  isSelect = false,
}: orderCardProps) => {
  const [isExplain, setIsExplain] = useState(false);
  const [orderLoc, setOrderLoc] = useState<Location>({ lat: 0, lng: 0 });

  const [orderType, setOrderType] = useState<number>(0);
  const TYPE_DELIVERY = [
    { label: "ส่งสินค้า", value: "0" },
    {
      label: "รับสินค้า",
      value: "1",
    },
  ];
  useEffect(() => {
    if (isSelect && !isExplain) {
      setIsExplain(true);
    }
  }, [isSelect]);
  const parseNumberToTime = (minutes?: number): string => {
    if (minutes == null || minutes < 0) return "00:00";

    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className={`${styles.container} ${isSelect ? styles.selected : ""}`}>
      <SkillInput
        isDisable
        isMutiSelect={false}
        value={[{ title: skill?.name ?? "", color: skill?.color }]}
        onChange={() => {}}
        skills={[]}
      ></SkillInput>
      <div className={styles.orderInfo}>
        <div className={styles.orderInfoHeader}>
          <div className={styles.orderName}>
            <h2>
              {name ?? "ไม่ระบุชื่อ"} {`(${id + 1})`}
            </h2>
            {/* <TextInput
              isDisable
              color="var(--p-800)"
              fontWeight="500"
              value={name ?? "ไม่ระบุชื่อ"}
              onChange={() => {}}
            ></TextInput> */}
          </div>
          <button
            className={`${isExplain ? styles.arrowDown : ""}`}
            onClick={() => setIsExplain((prev) => !prev)}
            type="button"
          >
            <IconSvgMono
              size={20}
              color="var(--p-500)"
              src="/icon/arrow-down.svg"
            ></IconSvgMono>
          </button>
        </div>
        <p className={styles.orderDescription}>{description}</p>
        {isExplain && (
          <div className={styles.orderContent}>
            <SelectInput
              isDisable
              label="ประเภทการการจัดส่ง"
              value={String(orderType)}
              options={TYPE_DELIVERY}
              onChange={(value: string) => setOrderType(Number(value))}
            ></SelectInput>
            <Priority p={priority}></Priority>
            <NumberInput
              isDisable
              labelSize="0.825rem"
              label="น้ำหนัก (กก.)"
              color="var(--p-700)"
              value={capacity}
            ></NumberInput>
            <div>
              <p className="">ช่วงเวลาเปิด-ปิด</p>
              <h3 className={styles.time}>
                {parseNumberToTime(timeWindowStart)} น. -{" "}
                {parseNumberToTime(timeWindowEnd)} น.
              </h3>
            </div>
            <LocationInput
              isDisable
              color="var(--s-500)"
              labelSize="0.725rem"
              labelGap="0.25rem"
              label="ตำแหน่ง"
              value={{ lat: desLatitude, lng: desLongitude }}
              onChange={() => {}}
            ></LocationInput>
          </div>
        )}
      </div>
    </div>
  );
};
