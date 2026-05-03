import styles from "./StepOtp.module.scss";
import OtpInput from "@/components/form/OtpInput/OtpInput";
import { useEffect, useState } from "react";
import Image from "next/image";
import { OtpProps } from "./types";

export const StepOTP = ({ phone, onBack, timeLeft, setTimeLeft, canResend, setCanResend }: OtpProps) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s: number) => {
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
  };

  const handleComplete = async (value: string) => {

    const isValid = value === "1234"; // mock ไว้ก่อน

    if (!isValid) {
      setError("เกิดข้อผิดพลาด รหัส OTP ผิดพลาด");
      return;
    }

  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.text}>
          <h2>ยืนยัน OTP</h2>
          <p>
            โปรดกรอก OTP ที่ส่งไปยังเบอร์ <span>{phone}</span>
          </p>
        </div>

        <OtpInput
          value={otp}
          onChange={(val) => {
            setOtp(val);
            setError("");
          }}
          onComplete={handleComplete}
          error={!!error}
        />
        </div>
      <div>
      {error && <p className={styles.error}>{error}</p>}
        <div className={styles.actions}>
          <button onClick={onBack} className={styles.backButton}>
            <Image src="/icon/arrow.svg" alt="back" width={10} height={10} />
          </button>

          {!canResend ? (
            <button disabled className={styles.button}>
              ขอใหม่อีกครั้งใน {formatTime(timeLeft)} วินาที
            </button>
          ) : (
            <button onClick={handleResend} className={styles.button}>
              ขอ  OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
