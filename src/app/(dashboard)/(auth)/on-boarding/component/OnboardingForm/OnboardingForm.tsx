import { ProgressBar } from "@/components/form/ProgressBar/ProgressBar"
import styles from "./OnboardingForm.module.scss"
import { useState } from "react";
import { StepForm } from "../StepForm/StepForm";
import { StepOTP } from "../StepOtp";
import { StepPhone } from "../StepPhone";

export const OnboardingForm = () => {
    const [step, setStep] = useState(1);
    const next = () => setStep((prev) => prev + 1);
    return (
        <div className={styles.container}>
            <div className={styles.bar}>
                <h1>สร้างโปรไฟล์ของคุณ</h1>
                <p>โปรดตั้งค่าโปรไฟล์เพื่อเปิดใช้งานระบบและปรับการทำงานให้เหมาะสมกับธุรกิจของคุณ</p>
                <ProgressBar current={step}></ProgressBar>
            </div>
            <div>
                {step === 1 && <StepForm onNext={next} />}
                {step === 2 && <StepPhone onNext={next}/>}
                {step === 3 && <StepOTP/>}
            </div>
        </div>
    )
}