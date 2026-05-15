"use client";

import { useState } from "react";
import { FloatingCard } from "../components/ui/FloatingCard/FloatingCard";
import { TextInput } from "@/components/form/TextInput/TextInput";
const Page = () => {
  const [isActive, setIsActive] = useState(false);
  const [vehicleName, setVehicleName] = useState("");
  return (
    <div>
      <h1
        style={{
          // backgroundColor: "red",
          margin: "14rem auto",
          width: "fit-content",
          fontWeight: "500",
          fontSize: "5rem",
          fontFamily: "Times New Roman",
        }}
      >
        SoRoutetion is on. 😶‍🌫️
      </h1>
    </div>
  );
};

export default Page;
