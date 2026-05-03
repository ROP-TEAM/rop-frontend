"use client";

import { OnboardingForm } from "./component/OnboardingForm/OnboardingForm";
import styles from "./page.module.scss";
import Image from "next/image";

const OnBoarding = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <OnboardingForm></OnboardingForm>
      </div>
      <div className={styles.right}>
        <Image
          src="/image/onboarding.png"
          alt="onboarding"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default OnBoarding;
