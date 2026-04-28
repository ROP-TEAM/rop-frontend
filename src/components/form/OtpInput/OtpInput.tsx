import { useRef} from 'react';
import styles from './OtpInput.module.scss';
const OtpInput = ({ length = 4,value = '', onChange, onComplete, placeholder="◯" }: OtpInputProps) => {
    const values = Array.from({ length }, (_, i) => value[i] || '');
    const inputsRef = useRef<HTMLInputElement[]>([]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) =>  {
        const val = e.target.value.replace(/\D/g, '').slice(-1);
        const newValues = [...values];
        newValues[index] = val;
        const newOtp = newValues.join('');
        onChange && onChange(newOtp);

         if (newOtp.length === length && onComplete) {
        onComplete(newOtp);
        }

        if (val && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    }

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
        if (e.key === 'ArrowRight' && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };

    return (
        <div className={styles.container}>
            {values.map((val, index) => (
                <input
                    key={index}
                    value={val}
                    className={styles.input}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el: HTMLInputElement | null) => {
                        if (el) inputsRef.current[index] = el;
                    }}
                    onFocus={handleFocus}
                    placeholder={placeholder}
                />
            ))}
        </div>
    )
}
export default OtpInput;