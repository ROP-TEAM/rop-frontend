"use client";

import { SegmentControl } from "@/components/ui/SegmentControl/SegmentControl";
import { SegmentProp } from "@/components/ui/SegmentControl/SegmentControl.types";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
const WorkSpaceLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname().split("/")[2];
  const segments: SegmentProp[] = [
    {
      icon: "/icon/car.svg",
      value: "vehicle",
      label: "ยานพาหนะ",
    },
    {
      icon: "/icon/card.svg",
      value: "board",
      label: "การ์ด",
    },
  ];
  return (
    <div>
      <p>{pathname}</p>S{children}
      <SegmentControl value={pathname} segments={segments}></SegmentControl>
    </div>
  );
};
export default WorkSpaceLayout;
