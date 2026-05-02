import { ProgressBar } from "@/components/form/ProgressBar/ProgressBar"
import styles from "./OnboardingForm.module.scss"
import { useState } from "react";
import { StepForm } from "../StepForm/StepForm";
import { StepOTP } from "../StepOtp";
import { StepPhone } from "../StepPhone/StepPhone";
import { OnboardingPayload } from "@/app/types/onboarding";

export const OnboardingForm = () => {
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState("");
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
}

const handleBack = () => {
  setStep((prev) => Math.max(prev - 1, 1));
};

    return (
        <div className={styles.container}>
            <div className={styles.bar}>
                <h1>สร้างโปรไฟล์ของคุณ</h1>
                <p>โปรดตั้งค่าโปรไฟล์เพื่อเปิดใช้งานระบบและปรับการทำงานให้เหมาะสมกับธุรกิจของคุณ</p>
                <ProgressBar current={step}></ProgressBar>
            </div>
            <div>
                {step === 2 && <StepForm onNext={handleOnboarding} />}
                {step === 1 && <StepPhone onNext={handlePhone} onBack={handleBack}/>}
                {step === 3 && <StepOTP/>}
            </div>
        </div>
    )
}