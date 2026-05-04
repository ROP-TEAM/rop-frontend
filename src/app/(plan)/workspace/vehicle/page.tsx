"use client";

import { useEffect, useState } from "react";

const Vehicle = () => {
  const [csv, setCsv] = useState<string[][]>([]);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const rows = text.split("\n").map((row) => row.split(","));
      setCsv(rows);
    };
    reader.readAsText(file);
  };
  useEffect(() => {
    console.log(csv);
  }, [csv]);
  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        placeholder="File here"
      />
      {csv[0]?.map((c, index) => (
        <div key={index} style={{ color: "red", border: "1px solid" }}>
          [{c}]
        </div>
      ))}
    </div>
  );
};
export default Vehicle;
