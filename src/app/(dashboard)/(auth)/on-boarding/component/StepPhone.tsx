import { useState } from "react";

export const StepPhone = ({ onNext }: { onNext: (phone: string) => void }) => {
    const [phone, setPhone] = useState("");

    const handleNext = () => {
        if (!phone) return; 
        onNext(phone);
    };

    return (
        <div>
            <h2>เบอร์โทรศัพท์</h2>

            <button onClick={handleNext} disabled={!phone}>
                ถัดไป
            </button>
        </div>
    );
};