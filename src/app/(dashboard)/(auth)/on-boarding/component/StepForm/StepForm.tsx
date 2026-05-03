import { TextInput } from "@/components/form/TextInput/TextInput";
import { useState } from "react";
import styles from "./StepForm.module.scss";
import { Autocomplete } from "@/components/form/AutoComplete/AutoComplete";
import { OnboardingPayload } from "@/app/types/onboarding";

export const StepForm = ({
  onNext,
}: {
  onNext: (data: OnboardingPayload) => Promise<void> | void;
}) => {
  const [companyName, setCompanyName] = useState("");
  const [touched, setTouched] = useState(false);
  const companyError = touched && companyName.trim() === "";

  const [category, setCategory] = useState("");
  const [categoryTouched, setCategoryTouched] = useState(false);
  const categoryOptions = ["ขนส่ง 1", "กนส่ง 2", "คนส่ง 3", "ขนส่ง 4"];
  const categoryError = categoryTouched && category.trim() === "";

  const [address,setAddress] = useState("");
  const [addressTouced, setAddressTouched] = useState(false);
  const addressError = addressTouced && address.trim() === "";

  const [province, setProvince] = useState("");
  const [proviceTouched, setProviceTouched] = useState(false);
  const proviceOptions = [
    { label: "ลพบุรี", value: "lopburi" },
    { label: "ขอนแก่น", value: "khonkaen" },
    { label: "กรุงเทพ", value: "bangkok" },
  ];
  const provinceError = proviceTouched && province.trim() === "";

  const [district, setDistrict] = useState("");
  const [districtTouced, setDistrictTouched] = useState(false);
  const districtMap: Record<string, { label: string; value: string }[]> = {
    lopburi: [
      { label: "อำเภอเมือง", value: "muang" },
      { label: "อำเภอพัฒนานิคม", value: "phatthana" },
    ],
    khonkaen: [{ label: "อำเภอเมือง", value: "muang" }],
    bangkok: [
      { label: "เขตบางนา", value: "bangna" },
      { label: "เขตลาดกระบัง", value: "ladkrabang" },
    ],
  };
  const districtOptions = districtMap[province] || [];
  const districtError = districtTouced && district.trim() === "";

  const [subdistrict, setSubdistrict] = useState("");
  const [subdistrictTouched, setSubdistrictTouched] = useState(false);
  const subdistrictError = subdistrictTouched && subdistrict.trim() === "";

  const subdistrictMap: Record<
    string,
    { label: string; value: string; zip: string }[]
  > = {
    muang: [
      { label: "ในเมือง", value: "nai_mueang", zip: "12314" },
      { label: "ศิลา", value: "sila", zip: "15645" },
    ],
    bangna: [{ label: "บางนาเหนือ", value: "bangna_nuea", zip: "12348" }],
  };
  const subdistrictOptions = subdistrictMap[district] || [];

  const [zipCode, setZipCode] = useState("");
  const handleSubdistrictChange = (val: string) => {
    setSubdistrict(val);

    const found = subdistrictOptions.find((o) => o.value === val);
    setZipCode(found?.zip || "");
  };

  const handleProvinceChange = (val: string) => {
    setProvince(val);
    setDistrict("");
    setSubdistrict("");
    setZipCode("");
  };

  const handleDistrictChange = (val: string) => {
    setDistrict(val);
    setSubdistrict("");
    setZipCode("");
  };

  const isFormValid =
    companyName.trim() !== "" &&
    category.trim() !== "" &&
    address.trim() !== "" &&
    province.trim() !== "" &&
    district.trim() !== "" &&
    subdistrict.trim() !== "";

  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async () => {
    setTouched(true);
    setCategoryTouched(true);
    setAddressTouched(true);
    setProviceTouched(true);
    setDistrictTouched(true);
    setSubdistrictTouched(true);

    setSubmitError("");

    if (!isFormValid) return;

    const payload: OnboardingPayload = {
      companyName,
      companyType: category,
      address,
      province,
      district,
      subDistrict: subdistrict,
      postalCode: zipCode,
    };

    try {
      await onNext(payload);
      console.log("payload", payload);
    } catch (err) {
      setSubmitError("เกิดข้อผิดพลาด:ไม่สามารถเชื่อมต่อ server ได้");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top_container}>
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
        <div className={styles.line}></div>
      </div>

      <div className={styles.bottom_container}>
        <h2>ตำแหน่งที่ตั้ง</h2>

        <div>
          <div className={styles.input}>
            <Autocomplete
              label="จังหวัด"
              placeholder="กรุณาเลือกจังหวัด"
              value={province}
              onChange={handleProvinceChange}
              options={proviceOptions}
              isError={provinceError}
              errorMessage="*กรุณาเลือกจังหวัด"
              onBlur={() => setProviceTouched(true)}
            />
            <Autocomplete
              label="อำเภอ"
              placeholder="กรุณาเลือกอำเภอ"
              value={district}
              onChange={handleDistrictChange}
              options={districtOptions}
              isError={districtError}
              errorMessage="*กรุณาเลือกอำเภอ"
              onBlur={() => setDistrictTouched(true)}
            />
          </div>

          <div className={styles.input}>
            <Autocomplete
              label="ตำบล"
              placeholder="กรุณาเลือกตำบล"
              value={subdistrict}
              onChange={handleSubdistrictChange}
              options={subdistrictOptions}
              isError={subdistrictError}
              errorMessage="*กรุณาเลือกตำบล"
              onBlur={() => setSubdistrictTouched(true)}
            />
            <TextInput
              label="รหัสไปรษณีย์"
              value={zipCode}
              placeholder=""
              readOnly
              IsActiveStyle
            />
          </div>
          <TextInput
            label="ที่อยู่"
            placeholder="กรอกที่อยู่ของบริษัท"
            value={address}
            onChange={setAddress}
            IsActiveStyle
            isError={addressError}
            errorMessage="*กรุณากรอกที่อยู่บริษัทให้ครบถ้วน"
            onBlur={() => setTouched(true)}
          />
        </div>
      </div>

      <p className={styles.submitError}>{submitError && `*${submitError}`}</p>

      <button onClick={handleSubmit} className={styles.button}>
        ขั้นตอนถัดไป
      </button>
    </div>
  );
};
