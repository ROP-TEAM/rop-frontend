import { ProgressBar } from "@/components/form/ProgressBar/ProgressBar";
import styles from "./OnboardingForm.module.scss";
import { useState } from "react";
import { StepForm } from "../StepForm/StepForm";
import { StepOTP } from "../StepOtp/StepOtp";
import { StepPhone } from "../StepPhone/StepPhone";
import { OnboardingPayload } from "@/app/types/onboarding";

export const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [canResend, setCanResend] = useState(false);
  // const next = () => setStep((prev) => prev + 1);
  const handleOnboarding = async (data: OnboardingPayload) => {
    console.log("ส่งข้อมูล:", data);

    // test error
    // throw new Error("test error");

    // หรือของจริง
    // await api.post("/onboarding", data);
    setStep((prev) => prev + 1);
  };

  const handlePhone = (phone: string) => {
    console.log("phone:", phone);
    setPhone(phone);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const formatPhone = (phone: string) =>
    phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <h1>สร้างโปรไฟล์ของคุณ</h1>
        <p>
          โปรดตั้งค่าโปรไฟล์เพื่อเปิดใช้งานระบบและปรับการทำงานให้เหมาะสมกับธุรกิจของคุณ
        </p>
        <ProgressBar current={step}></ProgressBar>
      </div>
      <div>
        {step === 1 && <StepForm onNext={handleOnboarding} />}
        {step === 2 && <StepPhone onNext={handlePhone} onBack={handleBack} />}
        {step === 3 && (
          <StepOTP
            phone={phone}
            onBack={handleBack}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            canResend={canResend}
            setCanResend={setCanResend}
          />
        )}
      </div>
    </div>
  );
};
