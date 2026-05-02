import { useState } from "react";
import { PhoneInput } from "@/components/form/PhoneInput/PhoneInput";
import styles from "./StepPhone.module.scss";
import Image from "next/image";

export const StepPhone = ({
  onNext,
  onBack,
}: {
  onNext: (phone: string) => void;
  onBack: () => void;
}) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const handleNext = () => {
    if (phone.length !== 10) {
      setError("*กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก");
      return;
    }

    setError("");
    onNext(phone);
  };

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <label>เบอร์โทรศัพท์</label>
        <PhoneInput
          value={phone}
          onChange={(raw) => {
            setPhone(raw);
            setError("");
          }}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles.actions}>
        <button onClick={onBack} className={styles.backButton}>
          <Image src="/icon/arrow.svg" alt="check" width={10} height={10} />
        </button>

        <button onClick={handleNext} className={styles.button}>
          ขอ OTP
        </button>
      </div>
    </div>
  );
};
