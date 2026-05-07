// src/components/FleetModal.tsx
import React from "react";
import { Vehicle } from "@/types/fleet";
import { parseLocation, getPriorityBadgeStyle } from "@/utils/mapHelpers";

interface FleetModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

const FleetModal: React.FC<FleetModalProps> = ({ vehicle, onClose }) => {
  if (!vehicle) return null;

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-[480px] max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              🚚 {vehicle.name}
            </h2>
            <p className="text-xs text-gray-500">
              {vehicle.route.length - 2} stops · starts & ends at Depot
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl font-light leading-none"
          >
            ×
          </button>
        </div>

        {/* Route List */}
        <div className="overflow-y-auto px-6 py-4 flex-1">
          <ol className="relative border-l border-gray-200 ml-2">
            {vehicle.route.map((point, index) => {
              const { lat, lng } = parseLocation(point.loc);
              const isDepot = point.prio === "Depot";

              return (
                <li key={index} className="mb-4 ml-4">
                  {/* Timeline Dot */}
                  <span
                    className={`absolute -left-1.5 w-3 h-3 rounded-full border-2 border-white ${
                      isDepot ? "bg-gray-400" : "bg-blue-500"
                    }`}
                  />

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">
                        Stop{" "}
                        {index === 0
                          ? "Start"
                          : index === vehicle.route.length - 1
                            ? "End"
                            : index}
                      </p>
                      <p className="text-sm text-gray-700 font-mono">
                        {lat.toFixed(5)}, {lng.toFixed(5)}
                      </p>
                    </div>
                    <span className={getPriorityBadgeStyle(point.prio)}>
                      {point.prio}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FleetModal;
