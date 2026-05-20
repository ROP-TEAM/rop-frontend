import styles from "./Sidebar.module.scss";
import IconSvgMono from "@/components/Icon/SvgIcon";
export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <IconSvgMono src="/icon/board.svg" className={styles.icon}></IconSvgMono>
      <IconSvgMono src="/icon/board.svg" className={styles.icon}></IconSvgMono>
    </div>
  );
};
