import IconSvgMono from "@/components/Icon/SvgIcon";
import styles from "./ControlCard.module.scss";
import { Vehicle } from "@/app/features/vehicle/vehicle.types";
import { useDispatch } from "react-redux";
import { detailOpen } from "@/app/features/sidePopup/sidePopupSlice";
import { addVehicle } from "@/app/features/detailVehicle/detailVehicleSlice";
export const VehicleCard = ({
  id,
  name,
  model,
  capacity,
  plateNumber,
  profile_id,
  workTimeStart,
  workTimeEnd,
  breakTimeStart,
  breakTimeEnd,
  maxTask,
  skills,
}: Vehicle) => {
  const dispatch = useDispatch();
  const onOpenDetail = () => {
    const vehicle: Vehicle = {
      id,
      name,
      model,
      capacity,
      plateNumber,
      profile_id,
      workTimeStart,
      workTimeEnd,
      breakTimeStart,
      breakTimeEnd,
      maxTask,
      skills,
    };
    dispatch(detailOpen());
    dispatch(addVehicle(vehicle));
  };
  return (
    <div onClick={() => onOpenDetail()} className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
      </div>
      <div className={styles.body}>
        <h4 className={styles.model}>{model}</h4>
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
