import { useState } from "react";
import { PhoneInput } from "@/components/form/PhoneInput/PhoneInput";

export const StepPhone = ({ onNext }: { onNext: (phone: string) => void }) => {
    const [phone, setPhone] = useState("");
    const [touched, setTouched] = useState(false);

    return (
        <div>
            <PhoneInput
                value={phone}
                onChange={(raw) => {
                    setPhone(raw);
                    if (!touched) setTouched(true);
                }}
            />
            <button onClick={() => onNext(phone)} disabled={phone.length < 10}>
                ถัดไป
            </button>
        </div>
    );
};