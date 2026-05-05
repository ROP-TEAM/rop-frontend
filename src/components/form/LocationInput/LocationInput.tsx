"use client";
import { LocationInputProps } from "./LocationInput.types";
import styles from "./LocationInput.module.scss";
import React, { ChangeEvent, useEffect, useRef } from "react";
import { Location } from "@/types/api.types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setOnFocus } from "@/app/features/mapClick/mapClickSlice";
export const LocationInput = ({
  labelColor = "var(--p-800)",
  labelSize = "1rem",
  label = "",
  labelGap = "0.5rem",
  placeholder = "",
  value,
  color = "var(--p-200)",
  fontSize = "1rem",
  width = "100%",
  onChange,
}: LocationInputProps) => {
  const latFocused = useRef(false);
  const lngFocused = useRef(false);
  const latRef = useRef<HTMLInputElement>(null);
  const handleSetFocusLat = () => {
    latRef.current?.focus();
  };
  const [latRaw, setLatRaw] = useState<string>(value?.lat?.toFixed(6));
  const [lngRaw, setLngRaw] = useState<string>(value?.lng?.toFixed(6));
  const { isOnFocus, lat, lng } = useSelector(
    (root: RootState) => root.mapClick,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!lngFocused.current) setLngRaw(value?.lng?.toFixed(6) ?? "0");
    if (!latFocused.current) setLatRaw(value?.lat?.toFixed(6) ?? "0");
  }, [value]);
  useEffect(() => {
    if (isOnFocus) {
      setLatRaw(lat.toFixed(6));
      setLngRaw(lng.toFixed(6));
    }
  }, [lat, lng]);
  return (
    <div>
      {label && (
        <label
          htmlFor={label}
          className={styles.label}
          style={
            {
              "--label-size": labelSize,
              "--label-color": labelColor,
            } as React.CSSProperties
          }
        >
          {label}
        </label>
      )}
      <div className={styles.locationInput}>
        <input
          ref={latRef}
          id={label}
          onFocus={(e) => {
            e.preventDefault();
            dispatch(setOnFocus(true));
            latFocused.current = true;
          }}
          className={styles.lat}
          value={latRaw}
          onChange={(e) => {
            const raw = e.target.value;
            const num = parseFloat(raw);
            if (num < -90 || num > 90) return;

            setLatRaw(raw);

            if (!isNaN(num)) {
              onChange({ ...value, lat: num });
            }
          }}
          onBlur={(e) => {
            const raw = e.target.value;
            const num = parseFloat(raw);
            setTimeout(() => dispatch(setOnFocus(false)), 200);
            if (isNaN(Number(lngRaw))) {
              setLngRaw("0");
              return;
            }
            if (isNaN(num)) {
              setLatRaw("0");
              return;
            }

            setLngRaw((prev) => Number(prev).toFixed(6));
            setLatRaw(num.toFixed(6));
          }}
          onPaste={(e) => {
            e.preventDefault();
            const text = e.clipboardData.getData("text").trim();
            if (text.includes(",")) {
              const parts = text.split(",").map((s) => s.trim());

              setLatRaw(parts[0]);
              setLngRaw(parts[1]);
            } else {
              setLatRaw(text);
            }
          }}
          placeholder={placeholder}
          style={
            {
              fontSize: fontSize,
              "--color-outFocus": color,
            } as React.CSSProperties
          }
          type="number"
        />
        <h3 onClick={() => handleSetFocusLat()} className={styles.comma}>
          ,
        </h3>
        <input
          className={styles.lng}
          onFocus={() => {
            lngFocused.current = true;
          }}
          value={lngRaw}
          onChange={(e) => {
            const raw = e.target.value;
            const num = parseFloat(raw);

            if (num < -180 || num > 180) return;

            setLngRaw(raw);

            if (!isNaN(num)) {
              onChange({ ...value, lng: num });
            }
          }}
          onBlur={(e) => {
            const raw = e.target.value;
            const num = parseFloat(raw);
            if (isNaN(num)) {
              setLngRaw("0");
              return;
            }
            setLngRaw(num.toFixed(6));
          }}
          onPaste={(e) => {
            e.preventDefault();
            const text = e.clipboardData.getData("text").trim();
            if (text.includes(",")) {
              const parts = text.split(",").map((s) => s.trim());

              setLatRaw(parts[0]);
              setLngRaw(parts[1]);
            } else {
              setLatRaw(text);
            }
          }}
          placeholder={placeholder}
          style={{ fontSize, "--color-outFocus": color } as React.CSSProperties}
          type="number"
        />
      </div>
    </div>
  );
};
