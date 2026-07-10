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
      <input type="text" placeholder="search..." />
      <div>
        {/* <Image
          src={session?.user?.image ?? "kkkk"}
          width={20}
          height={20}
          alt="userProfile"
        ></Image> */}
      </div>
    </div>
  );
};
