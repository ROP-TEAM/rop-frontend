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
const WorkSpace = () => {
  const [routeEditID, setRouteEditID] = useState(-1);
  const [isHideRoutes, setIsHideRoutes] = useState(true);
  const [tagSkill, setTagSkill] = useState<string>("");
  const [startHour, setStartHour] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [startminute, setStartMinute] = useState<string>("");
  const [endHour, setEndHour] = useState<string>("");
  const [endMinute, setEndMinute] = useState<string>("");
  const [maxTask, setMaxTask] = useState<string>("");
  const routeSlice = useSelector((state: RootState) => state.route);
  const [isEditRoute, setIsEditRoute] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [time, setTime] = useState({ hours: "", minutes: "" });
  const dispatch = useDispatch<AppDispatch>();
  const formatStringTime = (hour: string, minute: string): string => {
    const hh = hour.padStart(2, "0");
    const mm = minute.padStart(2, "0");

    return `${hh}.${mm}`;
  };
  const handleOtpComplete = (completedOtp: string) => {
    console.log("OTP:", completedOtp);
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
      setIsEditRoute(false);
      setRouteEditID(-1);
    } else {
      dispatch(addRoute(newRoute));
    }
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
  };
  return (
    <div>
      <button onClick={() => setIsHideRoutes((prev) => !prev)}>
        {isHideRoutes ? "show routes" : "hide routes"}
      </button>

      <br />
      {!isHideRoutes && (
        <section>
          <div>
            {routeSlice?.routes.map((r, index) => (
              <div key={index}>
                <span>
                  <p>dirver id:{r.id}</p>
                  <button type="button" onClick={() => initializeRouteEdit(r)}>
                    Edit
                  </button>
                </span>
                <p>
                  breakTime {r.breakTimeStart} to {r.breakTimeEnd}
                </p>
                <p>
                  workTime {r.workingTimeStart} to {r.workingTimeEnd}
                </p>
                <p>capacity {r.capacity}</p>
                <p>max task {r.maxTask}</p>
                <button
                  type="button"
                  onClick={() => dispatch(deleteRoute(r.id))}
                >
                  Delete
                </button>
                <div>================</div>
                <br />
              </div>
            ))}
          </div>
          <label htmlFor="">TagSkill </label>
          <select
            value={tagSkill}
            onChange={(e) => setTagSkill(e.target.value)}
          >
            <option value="">-- Select color --</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </select>
          <br />
          <br />
          <label htmlFor="">Capacity </label>
          <input
            type="text"
            placeholder="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="">Start </label>
          <input
            type="text"
            value={startHour}
            onChange={(e) => setStartHour(e.target.value)}
            placeholder="day"
          />
          <input
            type="text"
            placeholder="minute"
            value={startminute}
            onChange={(e) => setStartMinute(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="">End </label>
          <input
            type="text"
            value={endHour}
            onChange={(e) => setEndHour(e.target.value)}
            placeholder="hour"
          />
          <input
            type="text"
            placeholder="minute"
            value={endMinute}
            onChange={(e) => setEndMinute(e.target.value)}
          />

          <br />
          <br />
          <label htmlFor="">maxtask </label>
          <input
            value={maxTask}
            onChange={(e) => setMaxTask(e.target.value)}
            type="text"
          />
          <br />
          <button type="button" onClick={() => handlerCreateRoute()}>
            {isEditRoute ? `Edit ID ${routeEditID}` : "Create"}
          </button>
        </section>
      )}
      <br />
      <section></section>
    </div>
  );
};

export default WorkSpace;
