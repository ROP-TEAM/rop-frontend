import styles from "./Sidebar.module.scss";
import IconSvgMono from "@/components/Icon/SvgIcon";
import Link from "next/link";
export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <IconSvgMono src="/icon/board.svg" className={styles.icon}></IconSvgMono>
      <Link href={"/quickstart"}>
        <IconSvgMono
          src="/icon/table.svg"
          color="var(--p-800)"
          className={styles.icon}
        ></IconSvgMono>
      </Link>
    </div>
  );
};
