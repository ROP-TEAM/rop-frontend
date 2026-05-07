"use client";

import { AppDispatch, RootState } from "@/app/store";
import {
  addRoute,
  deleteRoute,
  patchRoute,
} from "@/app/features/route/routeSlice";
import { Route } from "@/app/types/route";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderManager from "./component/OrderManager";

// ─── Priority Badge Colors ────────────────────────────────────────────────────
const TAG_COLORS: Record<string, string> = {
  red: "bg-red-500/20 text-red-300 border-red-500/40",
  yellow: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  green: "bg-green-500/20 text-green-300 border-green-500/40",
  blue: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  "": "bg-gray-500/20 text-gray-300 border-gray-500/40",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2
                 text-white text-sm placeholder-gray-600
                 focus:outline-none focus:border-blue-500 focus:ring-1
                 focus:ring-blue-500 transition-colors"
    />
  </div>
);

const TimeRangeInput = ({
  label,
  hour,
  minute,
  onHourChange,
  onMinuteChange,
}: {
  label: string;
  hour: string;
  minute: string;
  onHourChange: (v: string) => void;
  onMinuteChange: (v: string) => void;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
      {label}
    </label>
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={hour}
        onChange={(e) => onHourChange(e.target.value)}
        placeholder="HH"
        maxLength={2}
        className="w-16 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2
                   text-white text-sm placeholder-gray-600 text-center
                   focus:outline-none focus:border-blue-500 focus:ring-1
                   focus:ring-blue-500 transition-colors"
      />
      <span className="text-gray-500 font-bold">:</span>
      <input
        type="text"
        value={minute}
        onChange={(e) => onMinuteChange(e.target.value)}
        placeholder="MM"
        maxLength={2}
        className="w-16 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2
                   text-white text-sm placeholder-gray-600 text-center
                   focus:outline-none focus:border-blue-500 focus:ring-1
                   focus:ring-blue-500 transition-colors"
      />
    </div>
  </div>
);

// ─── Route Card ───────────────────────────────────────────────────────────────

const RouteCard = ({
  route,
  onEdit,
  onDelete,
}: {
  route: Route;
  onEdit: (r: Route) => void;
  onDelete: (id: number) => void;
}) => {
  const tagColor = TAG_COLORS[route.tagSkill?.[0] ?? ""] ?? TAG_COLORS[""];

  return (
    <div
      className="bg-gray-800/60 border border-gray-700 rounded-xl p-4
                 hover:border-gray-500 transition-all duration-200 group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/50
                          flex items-center justify-center text-xs font-bold text-blue-300"
          >
            {route.id}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              Driver #{route.id}
            </p>
            <span
              className={`text-xs px-2 py-0.5 rounded-full border font-medium ${tagColor}`}
            >
              {route.tagSkill?.[0] || "No Tag"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(route)}
            className="p-1.5 rounded-lg bg-blue-600/20 border border-blue-500/40
                       text-blue-400 hover:bg-blue-600/40 transition-colors text-xs
                       font-medium px-3"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(route.id)}
            className="p-1.5 rounded-lg bg-red-600/20 border border-red-500/40
                       text-red-400 hover:bg-red-600/40 transition-colors text-xs
                       font-medium px-3"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-gray-900/60 rounded-lg p-2">
          <p className="text-gray-500 mb-0.5">Work Time</p>
          <p className="text-gray-200 font-mono">
            {route.workingTimeStart} → {route.workingTimeEnd}
          </p>
        </div>
        <div className="bg-gray-900/60 rounded-lg p-2">
          <p className="text-gray-500 mb-0.5">Break Time</p>
          <p className="text-gray-200 font-mono">
            {route.breakTimeStart} → {route.breakTimeEnd}
          </p>
        </div>
        <div className="bg-gray-900/60 rounded-lg p-2">
          <p className="text-gray-500 mb-0.5">Capacity</p>
          <p className="text-white font-semibold">{route.capacity}</p>
        </div>
        <div className="bg-gray-900/60 rounded-lg p-2">
          <p className="text-gray-500 mb-0.5">Max Tasks</p>
          <p className="text-white font-semibold">{route.maxTask}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Main WorkSpace ───────────────────────────────────────────────────────────

const WorkSpace = () => {
  const [routeEditID, setRouteEditID] = useState(-1);
  const [isHideRoutes, setIsHideRoutes] = useState(false);
  const [tagSkill, setTagSkill] = useState<string>("");
  const [startHour, setStartHour] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [startminute, setStartMinute] = useState<string>("");
  const [endHour, setEndHour] = useState<string>("");
  const [endMinute, setEndMinute] = useState<string>("");
  const [maxTask, setMaxTask] = useState<string>("");
  const [isEditRoute, setIsEditRoute] = useState<boolean>(false);

  const routeSlice = useSelector((state: RootState) => state.route);
  const dispatch = useDispatch<AppDispatch>();

  // ── Logic (unchanged) ──────────────────────────────────────────────────────

  const formatStringTime = (hour: string, minute: string): string => {
    const hh = hour.padStart(2, "0");
    const mm = minute.padStart(2, "0");
    return `${hh}.${mm}`;
  };

  const clearForm = () => {
    setTagSkill("");
    setCapacity("");
    setStartHour("");
    setStartMinute("");
    setEndHour("");
    setEndMinute("");
    setMaxTask("");
    setIsEditRoute(false);
    setRouteEditID(-1);
  };

  const handlerCreateRoute = () => {
    const startTime = formatStringTime(startHour, startminute);
    const endTime = formatStringTime(endHour, endMinute);
    const newRoute: Route = {
      id: isEditRoute
        ? routeEditID
        : routeSlice.routes[0]
          ? routeSlice.routes[routeSlice.routes.length - 1].id + 1
          : 0,
      tagSkill: [tagSkill],
      capacity: Number(capacity),
      workingTimeStart: startTime,
      workingTimeEnd: endTime,
      maxTask: Number(maxTask),
      breakTimeStart: "12.00",
      breakTimeEnd: "13.00",
    };

    if (isEditRoute) {
      dispatch(patchRoute(newRoute));
    } else {
      dispatch(addRoute(newRoute));
    }
    clearForm();
  };

  const initializeRouteEdit = (route: Route) => {
    setIsEditRoute(true);
    setRouteEditID(route.id);
    setStartHour(route.workingTimeStart.substring(0, 2));
    setStartMinute(route.workingTimeStart.substring(3, 5));
    setEndHour(route.workingTimeEnd.substring(0, 2));
    setEndMinute(route.workingTimeEnd.substring(3, 5));
    setCapacity(String(route.capacity));
    setTagSkill(route.tagSkill?.[0] ?? "");
    setMaxTask(String(route.maxTask));
    setIsHideRoutes(false); // open panel if hidden
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      {/* ══ LEFT SIDEBAR ══════════════════════════════════════════════════════ */}
      <aside
        className="w-80 flex-shrink-0 bg-gray-900 border-r border-gray-800
                        flex flex-col overflow-hidden"
      >
        {/* Sidebar Header */}
        <div
          className="px-4 py-4 border-b border-gray-800 flex items-center
                        justify-between"
        >
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">
              🚛 Route Manager
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {routeSlice.routes.length} vehicle
              {routeSlice.routes.length !== 1 ? "s" : ""} configured
            </p>
          </div>
          <button
            onClick={() => setIsHideRoutes((prev) => !prev)}
            className="text-xs px-3 py-1.5 rounded-lg bg-gray-800 border
                       border-gray-700 text-gray-400 hover:text-white
                       hover:border-gray-500 transition-colors"
          >
            {isHideRoutes ? "Show" : "Hide"}
          </button>
        </div>

        {/* Route List */}
        {!isHideRoutes && (
          <div
            className="flex-1 overflow-y-auto p-3 space-y-3
                          scrollbar-thin scrollbar-track-gray-900
                          scrollbar-thumb-gray-700"
          >
            {routeSlice.routes.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                <p className="text-3xl mb-2">🚗</p>
                <p className="text-sm">No routes yet</p>
                <p className="text-xs mt-1">Create one below</p>
              </div>
            ) : (
              routeSlice.routes.map((r) => (
                <RouteCard
                  key={r.id}
                  route={r}
                  onEdit={initializeRouteEdit}
                  onDelete={(id) => dispatch(deleteRoute(id))}
                />
              ))
            )}
          </div>
        )}

        {/* ── Create / Edit Form ──────────────────────────────────────────── */}
        <div className="border-t border-gray-800 p-4 space-y-4 bg-gray-900/80">
          {/* Form Title */}
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {isEditRoute
                ? `✏️ Editing Driver #${routeEditID}`
                : "➕ New Route"}
            </h2>
            {isEditRoute && (
              <button
                onClick={clearForm}
                className="text-xs text-gray-500 hover:text-red-400 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Tag Skill */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Tag Skill
            </label>
            <select
              value={tagSkill}
              onChange={(e) => setTagSkill(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2
                         text-white text-sm focus:outline-none focus:border-blue-500
                         focus:ring-1 focus:ring-blue-500 transition-colors"
            >
              <option value="">-- Select color --</option>
              <option value="red">🔴 Red</option>
              <option value="yellow">🟡 Yellow</option>
              <option value="green">🟢 Green</option>
              <option value="blue">🔵 Blue</option>
            </select>
          </div>

          {/* Capacity + MaxTask */}
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="Capacity"
              value={capacity}
              onChange={setCapacity}
              placeholder="e.g. 10"
            />
            <InputField
              label="Max Tasks"
              value={maxTask}
              onChange={setMaxTask}
              placeholder="e.g. 5"
            />
          </div>

          {/* Time Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <TimeRangeInput
              label="Start Time"
              hour={startHour}
              minute={startminute}
              onHourChange={setStartHour}
              onMinuteChange={setStartMinute}
            />
            <TimeRangeInput
              label="End Time"
              hour={endHour}
              minute={endMinute}
              onHourChange={setEndHour}
              onMinuteChange={setEndMinute}
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handlerCreateRoute}
            className={`w-full py-2.5 rounded-xl font-semibold text-sm
                        transition-all duration-200 active:scale-95
                        ${
                          isEditRoute
                            ? "bg-amber-600 hover:bg-amber-500 text-white"
                            : "bg-blue-600 hover:bg-blue-500 text-white"
                        }`}
          >
            {isEditRoute ? `💾 Save Changes` : "✅ Create Route"}
          </button>
        </div>
      </aside>

      {/* ══ MAIN CONTENT (Map + Orders) ═══════════════════════════════════════ */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header
          className="h-12 bg-gray-900 border-b border-gray-800
                           flex items-center px-4 gap-3 flex-shrink-0"
        >
          <span className="text-xs text-gray-500">Workspace</span>
          <span className="text-gray-700">/</span>
          <span className="text-xs text-gray-300 font-medium">
            Order Manager
          </span>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-500">Live</span>
          </div>
        </header>

        {/* OrderManager fills remaining space */}
        <div className="flex-1 overflow-auto">
          <OrderManager />
        </div>
      </main>
    </div>
  );
};

export default WorkSpace;
