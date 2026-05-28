"use client";
import { RootState } from "@/app/store";
import styles from "./Topbar.module.scss";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { controlToggle } from "@/app/features/sidePopup/sidePopupSlide";
export const Topbar = () => {
  const sidePopupSlice = useSelector(
    (state: RootState) => state.sidePopupReducer,
  );
  const dispatch = useDispatch();
  return (
    <div className={styles.topbar}>
      <button type="button" onClick={() => dispatch(controlToggle())}>
        Logo
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
