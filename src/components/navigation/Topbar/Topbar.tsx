"use client";
import { RootState } from "@/app/store";
import styles from "./Topbar.module.scss";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { controlToggle } from "@/app/features/sidePopup/sidePopupSlice";
import IconSvgMono from "@/components/Icon/SvgIcon";
export const Topbar = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.topbar}>
      <button
        className={styles.navHome}
        type="button"
        onClick={() => dispatch(controlToggle())}
      >
        <Image src="logo/primary.svg" alt="logo" width={20} height={20}></Image>
        <h3>Soroutetion</h3>
      </button>
      <div className={styles.rightBar}>
        <div className={styles.search}>
          <Image src="/icon/search.svg" alt="search" width={20} height={20} />

          <input type="text" placeholder="เริ่มค้นหา" />

          <button className={styles.buttonIcon}>
            <Image src="/icon/button.svg" alt="button" width={60} height={60} />
          </button>
        </div>
        <Image src="/icon/icon1.svg" alt="user" width={20} height={20} className={styles.icon} />
        <Image src="/icon/icon2.svg" alt="notification" width={20} height={20} className={styles.icon} />
        <Image src="/icon/user.svg" alt="user" width={30} height={30} className={styles.user} />
      </div>
    </div>
  );
};
