import { TextInput } from "@/components/form/TextInput/TextInput";
import { useState } from "react";
import styles from "./StepForm.module.scss";
import { Autocomplete } from "@/components/form/AutoComplete/AutoComplete";

export const StepForm = ({ onNext }: { onNext: () => void }) => {
  const [companyName, setCompanyName] = useState("");
  const [touched, setTouched] = useState(false);

  const companyError = touched && companyName.trim() === "";

  const [category, setCategory] = useState("");
  const [categoryTouched, setCategoryTouched] = useState(false);
  const categoryOptions = ["ขนส่ง 1", "กนส่ง 2", "คนส่ง 3", "ขนส่ง 4"];

  const categoryError = categoryTouched && category.trim() === "";

  return (
    <div className={styles.container}>
      <TextInput
        label="ชื่อบริษัท"
        placeholder="กรอกชื่อบริษัทที่ใช้งานร่วมกับโปรแกรม"
        value={companyName}
        onChange={setCompanyName}
        IsActiveStyle
        isError={companyError}
        errorMessage="*กรุณากรอกชื่อบริษัทให้ครบถ้วน"
        onBlur={() => setTouched(true)}
      />
      <Autocomplete
        label="ประเภทของบริษัท"
        placeholder="เลือกประเภทการทำงานของบริษัท"
        value={category}
        onChange={setCategory}
        options={categoryOptions}
        isError={categoryError}
        errorMessage="*กรุณาเลือกประเภทบริษัท"
        onBlur={() => setCategoryTouched(true)}
      />
      <button onClick={onNext}>ถัดไป</button>
    </div>
  );
};
