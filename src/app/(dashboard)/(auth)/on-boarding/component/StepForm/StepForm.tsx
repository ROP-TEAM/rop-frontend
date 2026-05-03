import { TextInput } from "@/components/form/TextInput/TextInput";
import { useState } from "react";
import styles from "./StepForm.module.scss";
import { Autocomplete } from "@/components/form/AutoComplete/AutoComplete";
import { OnboardingPayload } from "@/app/types/onboarding";

import provinces from "@/data/province.json";
import districts from "@/data/district.json";
import subDistricts from "@/data/sub_district.json";
import { SelectInput } from "@/components/form/SelectInput/SelectInput";
import companyTypes from "@/data/companyTypes.json";

export const StepForm = ({
  onNext,
  defaultData,
}: {
  onNext: (data: OnboardingPayload) => Promise<void> | void;
  defaultData?: OnboardingPayload;
}) => {
  const [companyName, setCompanyName] = useState(defaultData?.companyName || "");
  const [touched, setTouched] = useState(false);
  const companyError = touched && companyName.trim() === "";

  const [category, setCategory] = useState(defaultData?.companyType || "");
  const [categoryTouched, setCategoryTouched] = useState(false);
  const categoryError = categoryTouched && category.trim() === "";

  const [address, setAddress] = useState(defaultData?.address || "");
  const [addressTouced, setAddressTouched] = useState(false);
  const addressError = addressTouced && address.trim() === "";

  const [province, setProvince] = useState(defaultData?.province || "");
  const [proviceTouched, setProviceTouched] = useState(false);
  const provinceOptions = provinces
    .map((p) => ({
      label: p.name_th,
      value: p.id.toString(),
    }))
    .sort((a, b) => a.label.localeCompare(b.label, "th"));
  const provinceError = proviceTouched && province.trim() === "";

  const [district, setDistrict] = useState(defaultData?.district || "");
  const [districtTouced, setDistrictTouched] = useState(false);
  const districtOptions = districts
    .filter((d) => d.province_id.toString() === province)
    .map((d) => ({
      label: d.name_th,
      value: d.id.toString(),
    }))
    .sort((a, b) => a.label.localeCompare(b.label, "th"));
  const districtError = districtTouced && district.trim() === "";

  const [subdistrict, setSubdistrict] = useState(defaultData?.subDistrict || "");
  const [subdistrictTouched, setSubdistrictTouched] = useState(false);
  const subdistrictError = subdistrictTouched && subdistrict.trim() === "";

  const subdistrictOptions = subDistricts
    .filter((s) => s.district_id.toString() === district)
    .map((s) => ({
      label: s.name_th,
      value: s.id.toString(),
      zip: s.zip_code.toString(),
    }))
    .sort((a, b) => a.label.localeCompare(b.label, "th"));

  const [zipCode, setZipCode] = useState(defaultData?.postalCode || "");
  const handleSubdistrictChange = (val: string) => {
    setSubdistrict(val);

    const found = subdistrictOptions.find((s) => s.value === val);
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
        <SelectInput
          label="ประเภทของบริษัท"
          placeholder="เลือกประเภทการทำงานของบริษัท"
          value={category}
          onChange={setCategory}
          options={companyTypes}
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
              options={provinceOptions}
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
            label="ที่อยู่บริษัท"
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
