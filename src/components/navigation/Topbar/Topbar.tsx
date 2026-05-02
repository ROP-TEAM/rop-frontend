"use client";
import styles from "./Topbar.module.scss";
import { useSession } from "next-auth/react";
import Image from "next/image";
export const Topbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className={styles.topbar}>
      <div>Logo</div>
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
