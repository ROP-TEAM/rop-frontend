import { SkillInput } from "@/components/form/SkillInput/SkillInput";
import { SkillPillProps } from "@/components/ui/SkillPill/SkillPill.types";
import { NumberInput } from "@/components/form/NumberInput/NumberInput";
import { SelectInput } from "@/components/form/SelectInput/SelectInput";
import { LocationInput } from "@/components/form/LocationInput/LocationInput";
import { useState } from "react";
import IconSvgMono from "@/components/Icon/SvgIcon";
import { TextInput } from "@/components/form/TextInput/TextInput";
import styles from "./orderCard.module.scss";
import { Location } from "@/types/api.types";

export const OrderCard = () => {
  const [isExplain, setIsExplain] = useState(false);
  const [name, setName] = useState("#ORD30");
  const [capacity, setCapacity] = useState(0);
  const [orderLoc, setOrderLoc] = useState<Location>({ lat: 0, lng: 0 });
  const [skillList, setSkillList] = useState<SkillPillProps[]>([
    { title: "ของเย็น", color: "#60A5FA" },
    { title: "อาหารสด", color: "#34D399" },
    { title: "แช่แข็ง", color: "#38BDF8" },
    { title: "ของแตกง่าย", color: "#FBBF24" },
    { title: "วัตถุอันตราย", color: "#F87171" },
    { title: "ด่วนพิเศษ", color: "#A78BFA" },
    { title: "สินค้าทั่วไป", color: "#9CA3AF" },
    { title: "ควบคุมอุณหภูมิ", color: "#14B8A6" },
  ]);
  const [selectSkill, setSelectSkill] = useState<SkillPillProps[]>([
    { title: "ของเย็น", color: "#60A5FA" },
  ]);
  const [orderType, setOrderType] = useState<number>(0);
  const TYPE_DELIVERY = [
    { label: "ส่งสินค้า", value: "0" },
    {
      label: "รับสินค้า",
      value: "1",
    },
  ];
  return (
    <div className={styles.container}>
      <SkillInput
        isMutiSelect={false}
        value={selectSkill}
        onChange={setSelectSkill}
        skills={skillList}
      ></SkillInput>
      <div className={styles.orderInfo}>
        <div className={styles.orderInfoHeader}>
          <div className={styles.orderName}>
            <TextInput
              color="var(--p-800)"
              fontWeight="500"
              value={name}
              onChange={setName}
            ></TextInput>
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
        <p className={styles.orderDescription}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam est .
        </p>
        {isExplain && (
          <div className={styles.orderContent}>
            <NumberInput
              labelSize="0.725rem"
              label="น้ำหนัก"
              color="var(--p-700)"
              value={capacity}
              onChange={setCapacity}
            ></NumberInput>
            <SelectInput
              label="ประเภทการการจัดส่ง"
              value={String(orderType)}
              options={TYPE_DELIVERY}
              onChange={(value: string) => setOrderType(Number(value))}
            ></SelectInput>
            <LocationInput
              color="var(--s-500)"
              labelSize="0.725rem"
              labelGap="0.25rem"
              label="ตำแหน่ง"
              value={orderLoc}
              onChange={setOrderLoc}
            ></LocationInput>
          </div>
        )}
      </div>
    </div>
  );
};
