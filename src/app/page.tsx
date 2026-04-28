"use client";

import { useState } from "react";
import { FloatingCard } from "../components/ui/FloatCard/FloatCard";
import { useClickOutSide } from "@/hook/useClickOutSide";
const Page = () => {
  const [isActive, setIsActive] = useState(false);
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
    </div>
  );
};

export default Page;
