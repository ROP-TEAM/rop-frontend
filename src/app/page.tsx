"use client";

import dynamic from "next/dynamic";

const FleetMap = dynamic(() => import("@/components/FleetMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-screen bg-gray-900 text-white">
      <div className="text-center">
        <div className="text-4xl mb-4 animate-pulse">🗺️</div>
        <p className="text-gray-400 text-sm">Loading Fleet Map...</p>
      </div>
    </div>
  ),
});

export default function FleetMapWrapper() {
  return <FleetMap />;
}
