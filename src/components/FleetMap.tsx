"use client";

import React, { useState, useCallback, useMemo } from "react";
import Map from "react-map-gl/maplibre";
import DeckGL from "@deck.gl/react";
import { PathLayer, ScatterplotLayer, IconLayer } from "@deck.gl/layers";
import { PickingInfo } from "@deck.gl/core";
import "maplibre-gl/dist/maplibre-gl.css";
import { fleetData } from "../data/fleet";
import { ParsedVehicle } from "@/types/fleet";

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_VIEW_STATE = {
  longitude: 102.8352,
  latitude: 16.4442,
  zoom: 12,
  pitch: 45,
  bearing: 0,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

// Distinct RGBA colors per vehicle
const VEHICLE_COLORS: [number, number, number, number][] = [
  [255, 107, 107, 220], // red   → V-02
  [78, 205, 196, 220], // teal  → V-09
  [255, 230, 109, 220], // yellow→ V-11
];

// ─── Helper ───────────────────────────────────────────────────────────────────

/**
 * Parse a coordinate string "lat, lng" → [lng, lat] (deck.gl uses [lng, lat])
 */
function parseCoord(raw: string): [number, number] {
  const [lat, lng] = raw.split(",").map((v) => parseFloat(v.trim()));
  return [lng, lat];
}

function buildVehicles(): ParsedVehicle[] {
  return fleetData.data.map((vehicle, idx) => ({
    name: vehicle.name,
    route: vehicle.route.map((point) => parseCoord(point[0])),
    color: VEHICLE_COLORS[idx % VEHICLE_COLORS.length],
  }));
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

interface TooltipData {
  x: number;
  y: number;
  content: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FleetMap() {
  const vehicles = useMemo(() => buildVehicles(), []);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [activeVehicles, setActiveVehicles] = useState<Set<string>>(
    new Set(vehicles.map((v) => v.name)),
  );

  const toggleVehicle = (name: string) => {
    setActiveVehicles((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const filteredVehicles = useMemo(
    () => vehicles.filter((v) => activeVehicles.has(v.name)),
    [vehicles, activeVehicles],
  );

  // ── Path Layer (route lines) ─────────────────────────────────────────────

  const pathLayer = new PathLayer<ParsedVehicle>({
    id: "fleet-path-layer",
    data: filteredVehicles,
    getPath: (d) => d.route,
    getColor: (d) => d.color,
    getWidth: 4,
    widthMinPixels: 2,
    widthMaxPixels: 8,
    capRounded: true,
    jointRounded: true,
    pickable: true,
    onClick: (info: PickingInfo<ParsedVehicle>) => {
      if (info.object) {
        setTooltip({
          x: info.x,
          y: info.y,
          content: `🚗 Route: ${info.object.name}`,
        });
      }
    },
  });

  // ── Scatterplot Layer (waypoints) ────────────────────────────────────────

  interface WaypointDatum {
    position: [number, number];
    color: [number, number, number, number];
    vehicle: string;
    index: number;
    isDepot: boolean;
  }

  const waypointData = useMemo<WaypointDatum[]>(() => {
    const points: WaypointDatum[] = [];
    filteredVehicles.forEach((v) => {
      v.route.forEach((pos, idx) => {
        points.push({
          position: pos,
          color: v.color,
          vehicle: v.name,
          index: idx,
          isDepot: idx === 0 || idx === v.route.length - 1,
        });
      });
    });
    return points;
  }, [filteredVehicles]);

  const scatterLayer = new ScatterplotLayer<WaypointDatum>({
    id: "fleet-scatter-layer",
    data: waypointData,
    getPosition: (d) => d.position,
    getFillColor: (d) => (d.isDepot ? [255, 255, 255, 255] : d.color),
    getRadius: (d) => (d.isDepot ? 14 : 7),
    radiusMinPixels: 4,
    radiusMaxPixels: 20,
    pickable: true,
    stroked: true,
    getLineColor: [30, 30, 30, 200],
    getLineWidth: 2,
    onClick: (info: PickingInfo<WaypointDatum>) => {
      if (info.object) {
        const label = info.object.isDepot
          ? `🏠 Depot — ${info.object.vehicle}`
          : `📍 Stop #${info.object.index} — ${info.object.vehicle}`;
        setTooltip({ x: info.x, y: info.y, content: label });
      }
    },
  });

  const layers = [pathLayer, scatterLayer];

  const onMapClick = useCallback(() => setTooltip(null), []);

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="relative w-full h-screen bg-gray-900">
      {/* DeckGL + MapLibre */}
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={{ dragRotate: true }}
        layers={layers}
        onClick={onMapClick}
      >
        <Map mapStyle={MAP_STYLE} />
      </DeckGL>

      {/* ── Legend / Controls ──────────────────────────────────────────── */}
      <div
        className="absolute top-4 left-4 z-10 bg-gray-900/90 border border-gray-700 
                      rounded-2xl p-4 text-white shadow-xl backdrop-blur-sm min-w-[180px]"
      >
        <h2 className="text-sm font-bold tracking-widest text-gray-300 uppercase mb-3">
          🚛 Fleet Vehicles
        </h2>
        {vehicles.map((v) => {
          const [r, g, b] = v.color;
          const active = activeVehicles.has(v.name);
          return (
            <button
              key={v.name}
              onClick={() => toggleVehicle(v.name)}
              className={`flex items-center gap-3 w-full mb-2 px-3 py-2 rounded-lg 
                          transition-all duration-200 text-left
                          ${
                            active
                              ? "bg-gray-700/80 opacity-100"
                              : "bg-gray-800/40 opacity-40"
                          }`}
            >
              <span
                className="w-4 h-4 rounded-full flex-shrink-0 border-2 border-white/30"
                style={{ backgroundColor: `rgb(${r},${g},${b})` }}
              />
              <span className="text-sm font-medium">{v.name}</span>
              <span className="ml-auto text-xs text-gray-400">
                {v.route.length} pts
              </span>
            </button>
          );
        })}

        <div className="mt-3 border-t border-gray-700 pt-3 text-xs text-gray-500 space-y-1">
          <p>⚪ White dot = Depot</p>
          <p>🟣 Color dot = Stop</p>
          <p>Click route/stop for info</p>
        </div>
      </div>

      {/* ── Stats Panel ────────────────────────────────────────────────── */}
      <div
        className="absolute top-4 right-4 z-10 bg-gray-900/90 border border-gray-700
                      rounded-2xl p-4 text-white shadow-xl backdrop-blur-sm min-w-[160px]"
      >
        <h2 className="text-sm font-bold tracking-widest text-gray-300 uppercase mb-3">
          📊 Stats
        </h2>
        {vehicles.map((v) => {
          const [r, g, b] = v.color;
          return (
            <div key={v.name} className="flex items-center gap-2 mb-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: `rgb(${r},${g},${b})` }}
              />
              <span className="text-xs text-gray-300">{v.name}</span>
              <span className="ml-auto text-xs font-mono text-gray-400">
                {v.route.length - 2} stops
              </span>
            </div>
          );
        })}
        <div className="mt-2 border-t border-gray-700 pt-2">
          <p className="text-xs text-gray-500">
            Active:{" "}
            <span className="text-white font-bold">
              {activeVehicles.size}/{vehicles.length}
            </span>
          </p>
        </div>
      </div>

      {/* ── Tooltip ────────────────────────────────────────────────────── */}
      {tooltip && (
        <div
          className="absolute z-20 bg-gray-800 border border-gray-600 
                     text-white text-xs px-3 py-2 rounded-lg shadow-lg 
                     pointer-events-none"
          style={{ left: tooltip.x + 10, top: tooltip.y + 10 }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
