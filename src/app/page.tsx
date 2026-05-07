import React from "react";
import FleetMap from "@/components/FleetMap";
import { fleetData } from "@/data/fleet";

export default function Page() {
  return <FleetMap vehicles={fleetData.data} />;
}
