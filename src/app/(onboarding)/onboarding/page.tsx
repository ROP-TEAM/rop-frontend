"use client";

import {
  CompanyType,
  OnboardingPayload,
} from "@/app/features/onboarding/types";
import { useEffect, useState } from "react";
import province from "@/data/province.json";
import district from "@/data/district.json";
import subDistrict from "@/data/sub_district.json";
import { getToken } from "next-auth/jwt";
import {
  useSubmitOnboardingMutation,
  useOtpValidationMutation,
  useGetOtpMutation,
} from "@/app/features/onboarding/onboardingApi";
import { useSession } from "next-auth/react";
const Onboarding = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState<CompanyType | null>(null);
  const [selectProvince, setSelectProvince] = useState("");
  const [selectDistrict, setSelectDistrict] = useState("");
  const [selectSubDistrict, setSelectSubDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [alley, setAlley] = useState("");
  const [tel, setTel] = useState("");
  const [reqError, setReqError] = useState("");
  const [onboardingState, setOnboardingState] = useState(0);
  const [submitOnboarding, { isLoading, error }] =
    useSubmitOnboardingMutation();
  const [submitTel] = useGetOtpMutation();
  const { data: session } = useSession();

  const filterDistrict = district.filter(
    (d) => d.province_id === Number(selectProvince),
  );

  const filterSubDistrict = subDistrict.filter(
    (s) => s.district_id === Number(selectDistrict),
  );

  const zipCode = String(
    subDistrict.find((s) => s.id === Number(selectSubDistrict))?.zip_code,
  );
  const token = session?.backendToken;

  useEffect(() => {
    if (token) {
      try {
        const base64 = token.split(".")[1];
        const decoded = JSON.parse(atob(base64));
        console.log(decoded);
        console.log(token);
      } catch (e) {
        console.log(e);
      }
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onboardingState == 0) {
      if (!companyType) return;
      const onboardingPayload: OnboardingPayload = {
        companyName,
        companyType,
        province: selectProvince,
        district: selectDistrict,
        subDistrict: selectSubDistrict,
        address,
        alley,
        postalCode: zipCode,
        tel: "0615804472",
      };
      try {
        const res = await submitOnboarding(onboardingPayload);
        console.log(JSON.stringify(onboardingPayload));
        console.log(res.data?.message);
      } catch (error) {
        console.error(error);
        setReqError("error");
      }
    } else if (onboardingState == 1) {
      try {
        const res = await submitTel({ tel: tel });
        console.log(res.data?.refNo);
      } catch (err) {
        setReqError("error");
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="companyName">companyName</label>
        <input
          type="text"
          name=""
          id="company"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="กรอกชื่อบริษัท"
        />
        <label htmlFor="">ประเภทบริษัท</label>
        <select
          value={companyType ?? ""}
          onChange={(e) => setCompanyType(e.target.value as CompanyType)}
        >
          <option value={""} disabled>
            เลือกประเภทบริษัท
          </option>
          {Object.values(CompanyType).map((c, index) => (
            <option value={c} key={index}>
              {c}
            </option>
          ))}
        </select>
        <br />
        <br />
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
        <label htmlFor="zipCode">รหัสไปรษณีย์</label>
        <input type="text" name="" id="zipCode" value={zipCode} disabled />
        <br />
        <br />
        <label htmlFor="">ตรอก/ซอย</label>
        <input
          type="text"
          placeholder="ตรอก/ซอย"
          value={alley}
          onChange={(e) => setAlley(e.target.value)}
        />
        <label htmlFor="">ที่อยู่บริษัท</label>
        <input
          type="text"
          value={address}
          placeholder="ที่อยู่"
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <br />
        {onboardingState == 1 && (
          <>
            <label htmlFor="tel">เบอร์โทรศัพท์</label>
            <input
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              type="tel"
              placeholder="เบอร์โทรศัพท์"
              pattern="^0[0-9]{9}$"
              required
            />
          </>
        )}
        <button type="submit">SEND</button>
      </form>
    </div>
  );
};

export default Onboarding;
