// src/utils/mapHelpers.ts
import { ParsedLocation, Priority } from "@/types/fleet";

export const parseLocation = (loc: string[]): ParsedLocation => {
  const [lat, lng] = loc[0].split(",").map((v) => parseFloat(v.trim()));
  return { lat, lng };
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  Depot: "#6B7280", // gray
  Critical: "#DC2626", // red
  High: "#F97316", // orange
  Medium: "#EAB308", // yellow
  Low: "#22C55E", // green
  Heavy: "#7C3AED", // purple
};

export const VEHICLE_ROUTE_COLORS: string[] = [
  "#3B82F6", // blue   → V-02
  "#EC4899", // pink   → V-09
  "#14B8A6", // teal   → V-11
];

export const getPriorityBadgeStyle = (priority: Priority): string => {
  const base = "px-2 py-0.5 rounded-full text-xs font-semibold text-white";
  const colorMap: Record<Priority, string> = {
    Depot: `${base} bg-gray-500`,
    Critical: `${base} bg-red-600`,
    High: `${base} bg-orange-500`,
    Medium: `${base} bg-yellow-500`,
    Low: `${base} bg-green-500`,
    Heavy: `${base} bg-purple-700`,
  };
  return colorMap[priority];
};
