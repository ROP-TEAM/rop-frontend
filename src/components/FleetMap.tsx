// src/components/FleetMap.tsx
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  GoogleMap,
  useJsApiLoader,
  Polyline,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { Vehicle } from "@/types/fleet";

import {
  parseLocation,
  PRIORITY_COLORS,
  VEHICLE_ROUTE_COLORS,
} from "@/utils/mapHelpers";

import FleetControls from "./FleetControls";
import FleetModal from "./FleetModal";

interface FleetMapProps {
  vehicles: Vehicle[];
}

// Map container style
const MAP_CONTAINER_STYLE: React.CSSProperties = {
  width: "100%",
  height: "100vh",
};

// Default center
const DEFAULT_CENTER = {
  lat: 16.4442,
  lng: 102.8352,
};

// localStorage key
const STORAGE_KEY = "fleet-visible-routes";

const FleetMap: React.FC<FleetMapProps> = ({ vehicles }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  /**
   * route visibility state
   * default = false ทุกอัน
   */
  const [visibleRoutes, setVisibleRoutes] = useState<Record<string, boolean>>(
    {},
  );

  /**
   * selected vehicle
   */
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  /**
   * active marker
   */
  const [activeMarker, setActiveMarker] = useState<{
    position: google.maps.LatLngLiteral;
    label: string;
    priority: string;
  } | null>(null);

  /**
   * map ref
   */
  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  /**
   * load state from localStorage
   */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        const mergedState = Object.fromEntries(
          vehicles.map((vehicle) => [
            vehicle.name,
            parsed[vehicle.name] ?? false,
          ]),
        );

        setVisibleRoutes(mergedState);
      } catch {
        setVisibleRoutes(
          Object.fromEntries(vehicles.map((vehicle) => [vehicle.name, false])),
        );
      }
    } else {
      /**
       * default ทุก route ปิด
       */
      setVisibleRoutes(
        Object.fromEntries(vehicles.map((vehicle) => [vehicle.name, false])),
      );
    }
  }, [vehicles]);

  /**
   * save localStorage
   */
  useEffect(() => {
    if (Object.keys(visibleRoutes).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visibleRoutes));
    }
  }, [visibleRoutes]);

  /**
   * toggle route
   */
  const handleToggleRoute = (name: string) => {
    setVisibleRoutes((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  /**
   * load error
   */
  if (loadError) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        ❌ Failed to load Google Maps. Check your API key.
      </div>
    );
  }

  /**
   * loading
   */
  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center animate-pulse text-gray-500">
        Loading map...
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={DEFAULT_CENTER}
        zoom={13}
        onLoad={onMapLoad}
        onClick={() => setActiveMarker(null)}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        }}
      >
        {vehicles.map((vehicle, vIndex) => {
          const isVisible = visibleRoutes[vehicle.name] ?? false;

          /**
           * ถ้าปิด route
           * ไม่ render เลย
           */
          if (!isVisible) {
            return null;
          }

          const routeColor =
            VEHICLE_ROUTE_COLORS[vIndex % VEHICLE_ROUTE_COLORS.length];

          const parsedPath = vehicle.route.map((point) =>
            parseLocation(point.loc),
          );

          return (
            <React.Fragment key={`${vehicle.name}-${vIndex}`}>
              {/* Route line */}
              <Polyline
                path={parsedPath}
                options={{
                  strokeColor: routeColor,
                  strokeOpacity: 0.85,
                  strokeWeight: 4,
                  geodesic: true,
                }}
              />

              {/* Route markers */}
              {vehicle.route.map((point, pIndex) => {
                const position = parseLocation(point.loc);

                const isDepot = point.prio === "Depot";

                return (
                  <Marker
                    key={`${vehicle.name}-${pIndex}`}
                    position={position}
                    zIndex={999}
                    label={{
                      text: pIndex === 0 ? "START" : ` ${pIndex}`,
                      color: "#ffffff",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                    title={`${vehicle.name} · Stop ${pIndex} · ${point.prio}`}
                    icon={{
                      path: isDepot
                        ? google.maps.SymbolPath.BACKWARD_CLOSED_ARROW
                        : google.maps.SymbolPath.CIRCLE,

                      fillColor: PRIORITY_COLORS[point.prio],

                      fillOpacity: 1,
                      strokeColor: "#ffffff",
                      strokeWeight: 2,
                      scale: isDepot ? 10 : 14,
                    }}
                    onClick={() =>
                      setActiveMarker({
                        position,
                        label: `${vehicle.name} — Stop ${pIndex}`,
                        priority: point.prio,
                      })
                    }
                  />
                );
              })}
            </React.Fragment>
          );
        })}

        {/* Info window */}
        {activeMarker && (
          <InfoWindow
            position={activeMarker.position}
            onCloseClick={() => setActiveMarker(null)}
          >
            <div className="text-sm">
              <p className="font-semibold">{activeMarker.label}</p>

              <p className="text-gray-500">Priority: {activeMarker.priority}</p>

              <p className="text-xs text-gray-400">
                {activeMarker.position.lat.toFixed(5)},{" "}
                {activeMarker.position.lng.toFixed(5)}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Sidebar */}
      <FleetControls
        vehicles={vehicles}
        visibleRoutes={visibleRoutes}
        onToggleRoute={handleToggleRoute}
        onSelectVehicle={setSelectedVehicle}
      />

      {/* Modal */}
      <FleetModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
      />
    </div>
  );
};

export default FleetMap;
