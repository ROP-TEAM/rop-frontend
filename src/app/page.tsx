import styles from "./page.module.scss";
import Link from "next/link";

const Landing = () => {
  return (
    <div className={styles.page}>
      <Link href={"/map"}>
        <h1 className={styles.text}>Soroutetion is On. 😉</h1>
      </Link>
    </div>
  );
};

export default Landing;
