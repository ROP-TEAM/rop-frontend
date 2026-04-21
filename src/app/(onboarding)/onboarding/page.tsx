"use client";

import { CompanyType } from "@/app/features/onboarding/types";
import { useState } from "react";
import province from "@/data/province.json";
import district from "@/data/district.json";
import subDistrict from "@/data/sub_district.json";
const Onboarding = () => {
  const [companyName, setCompanyName] = useState("");
  const [conpanyType, setCompanyType] = useState<CompanyType | null>(null);
  const [selectProvince, setSelectProvince] = useState("");
  const [selectDistrict, setSelectDistrict] = useState("");
  const [selectSubDistrict, setSelectSubDistrict] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postCode, setPostCode] = useState("");
  const [tel, setTel] = useState();

  const filterDistrict = district.filter(
    (d) => d.province_id === Number(selectProvince),
  );

  const filterSubDistrict = subDistrict.filter(
    (s) => s.district_id === Number(selectDistrict),
  );

  const zipCode = subDistrict.find(
    (s) => s.id === Number(selectSubDistrict),
  )?.zip_code;

  return (
    <div>
      <p>Hello onboardign</p>
      <label htmlFor="">จังหวัด </label>
      <select
        name="province"
        id="province"
        value={selectProvince}
        onChange={(e) => {
          setSelectProvince(e.target.value);
          setSelectSubDistrict("");
        }}
      >
        <option value="">--ระบุจังหงวัด--</option>
        {province.map((p, index) => (
          <option key={index} value={p.id}>
            {p.name_th}
          </option>
        ))}
      </select>

      <label htmlFor=""> อำเภอ </label>
      <select
        name="district"
        id="district"
        value={selectDistrict}
        onChange={(e) => setSelectDistrict(e.target.value)}
      >
        <option value="">--ระบุอำเภอ--</option>
        {filterDistrict.map((d, index) => (
          <option key={index} value={d.id}>
            {d.name_th}
          </option>
        ))}
      </select>

      <label htmlFor=""> ตำบล </label>
      <select
        name="subdistrict"
        id="subdistrict"
        value={selectSubDistrict}
        onChange={(e) => setSelectSubDistrict(e.target.value)}
      >
        <option value="">--ระบุตำบล--</option>
        {filterSubDistrict.map((s, index) => (
          <option key={index} value={s.id}>
            {s.name_th}
          </option>
        ))}
      </select>
      <p>zip code :{zipCode}</p>
    </div>
  );
};

export default Onboarding;
