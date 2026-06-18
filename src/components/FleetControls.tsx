// src/components/FleetControls.tsx
import React from "react";
import { Vehicle } from "@/types/fleet";
import { VEHICLE_ROUTE_COLORS } from "@/utils/mapHelpers";

interface FleetControlsProps {
  vehicles: Vehicle[];
  visibleRoutes: Record<string, boolean>;
  onToggleRoute: (vehicleName: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

const FleetControls: React.FC<FleetControlsProps> = ({
  vehicles,
  visibleRoutes,
  onToggleRoute,
  onSelectVehicle,
}) => {
  return (
    <div className="absolute top-4 left-4 z-10 bg-white rounded-2xl shadow-lg p-4 w-56">
      <h2 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
        🚚 Fleet List
      </h2>

      <div className="flex flex-col gap-2">
        {vehicles.map((vehicle, index) => {
          const color =
            VEHICLE_ROUTE_COLORS[index % VEHICLE_ROUTE_COLORS.length];
          const isVisible = visibleRoutes[vehicle.name] ?? true;

          return (
            <div
              key={vehicle.name}
              className="flex items-center justify-between gap-2 p-2 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
            >
              {/* Color Indicator */}
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />

              {/* Vehicle Name → opens modal */}
              <button
                className="flex-1 text-left text-sm font-medium text-gray-800 hover:text-blue-600 transition"
                onClick={() => onSelectVehicle(vehicle)}
              >
                {vehicle.name}
              </button>

              {/* Toggle Visibility */}
              <button
                onClick={() => onToggleRoute(vehicle.name)}
                className={`text-xs px-2 py-0.5 rounded-full border transition font-medium ${
                  isVisible
                    ? "bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100"
                    : "bg-gray-100 border-gray-300 text-gray-400 hover:bg-gray-200"
                }`}
              >
                {isVisible ? "ON" : "OFF"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Priority Legend */}
      <div className="mt-4 border-t pt-3">
        <p className="text-xs font-semibold text-gray-500 mb-2">
          Priority Legend
        </p>
        {(["Critical", "High", "Medium", "Low", "Depot"] as const).map((p) => (
          <div key={p} className="flex items-center gap-2 mb-1">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: {
                  Depot: "#6B7280",
                  Critical: "#DC2626",
                  High: "#F97316",
                  Medium: "#EAB308",
                  Low: "#22C55E",
                }[p],
              }}
            />
            <span className="text-xs text-gray-600">{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FleetControls;
