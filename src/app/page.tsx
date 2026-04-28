"use client";

import { useState } from "react";
import { FloatingCard } from "../components/ui/FloatCard/FloatCard";
import { TextInput } from "@/components/form/TextInput/TextInput";
const Page = () => {
  const [isActive, setIsActive] = useState(false);
  const [vehicleName, setVehicleName] = useState("");
  return (
    <div style={{ height: "300px" }}>
      <div style={{ margin: "2rem auto", width: "fit-content" }}>
        <FloatingCard
          setIsActive={setIsActive}
          isActive={isActive}
          isOnTop={false}
          trigger={
            <button type="button" onClick={() => setIsActive((prev) => !prev)}>
              check Is out
            </button>
          }
        >
          <FloatingCard.body
            isHasLine={false}
            onClick={() => console.log("Hello")}
          >
            HI
          </FloatingCard.body>
          <FloatingCard.body isHasLine={true}>
            สวัสดีครับ floating Line
          </FloatingCard.body>
          <FloatingCard.body isHasLine={false}>hello</FloatingCard.body>
        </FloatingCard>
      </div>
      <TextInput
        color="var(--p-500)"
        label="ชื่อรถ"
        width="16rem"
        placeholder="ยังไม่ได้กรอกชื่อรถ"
        onChange={setVehicleName}
        value={vehicleName}
      ></TextInput>
    </div>
  );
};

export default Page;
