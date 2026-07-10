import React from "react";
import styles from "./Skeleton.module.scss";

const Skeleton = ({
  width = "8rem",
  height = "4rem",
  borderRadius = "8%",
  backgrounnd = "linear-gradient(90deg,#d6d6d6 25%,#e3e3e3 50%,#d6d6d6 75%)",
}: SkeletonProps) => {
  return (
    <div
      style={
        {
          "--width": width,
          "--height": height,
          "--border-radius": borderRadius,
          "--background": backgrounnd,
        } as React.CSSProperties
      }
      className={styles.skeleton}
    ></div>
  );
};
export default Skeleton;
