"use client";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { Polyline } from "@react-google-maps/api";
import { OrderCard } from "./orderCard/orderCard";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./map.module.scss";
import { VehicleCard } from "./Component/VehicleCard/ControlCard";
import IconSvgMono from "@/components/Icon/SvgIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  controlClose,
  detailOpen,
} from "@/app/features/sidePopup/sidePopupSlide";
import { RootState } from "@/app/store";
import { setLatLng } from "@/app/features/mapClick/mapClickSlice";
import mockOptimize from "@/data/mock/optimize_1.json";
const MapWorkspace = () => {
  const sidePopupSlice = useSelector((state: RootState) => state.sidePopup);
  const dispatch = useDispatch();
  const [manageState, setManageState] = useState<"vehicle" | "order">(
    "vehicle",
  );
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 16.441879460231092,
    lng: 102.8275588872729,
  });

  const [isVehicleState, setIsVehicleState] = useState<boolean>(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "";
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });
  const [hoverDirection, setHoverDirection] = useState<number | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  function mulberry32(seed: number) {
    return function () {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const DarkPastelColor: string[] = [
    "#E63946",
    "#1D3557",
    "#2A9D8F",
    "#F4A261",
    "#8338EC",
    "#3A86FF",
    "#E07A5F",
    "#556B2F",
    "#8E9AAF",
    "#D90429",
    "#7209B7",
    "#4361EE",
    "#D81159",
    "#1A5235",
    "#B5838D",
  ];

  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  const polylineRefs = useRef<google.maps.Polyline[]>([]);
  const markerRefs = useRef<google.maps.Marker[][]>([]);

  useEffect(() => {
    if (!isLoaded || !map) return;

    mockOptimize.routes.forEach((vehicle, index) => {
      const service = new google.maps.DirectionsService();
      const route = vehicle.stops;
      const destinationRoute = route[route.length - 1];

      service.route(
        {
          origin: { lat: 16.2916, lng: 102.6161 },
          destination: { lat: 16.2916, lng: 102.6161 },
          waypoints: route.map((n) => ({
            location: { lat: n.desLatitude, lng: n.desLongitude },
            stopover: true,
          })),
          optimizeWaypoints: false,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          console.log(`route ${index} status:`, status);
          console.log(`route ${index} result:`, result);
          if (status === "OK" && result) {
            const polyline = new google.maps.Polyline({
              path: result.routes[0].overview_path,
              strokeColor: DarkPastelColor[index % 15],
              strokeOpacity: 0.85,
              strokeWeight: 4,
              zIndex: index,
              map,
            });

            const markers = route.map((stop, stopIndex) => {
              return new google.maps.Marker({
                position: { lat: stop.desLatitude, lng: stop.desLongitude },
                map,
                visible: false,
                title: stop.orderName ?? `Stop`,
                label: {
                  text: String(stopIndex + 1),
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: "bold",
                },
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 7,
                  fillColor: "red",
                  fillOpacity: 1,
                  strokeColor: "#ffffff",
                  strokeWeight: 2,
                },
              });
            });
            markerRefs.current[index] = markers;

            polyline.addListener("mouseover", () => {
              console.log(route);
              polylineRefs.current.forEach((p, i) => {
                p.setOptions({
                  strokeOpacity: i === index ? 1.0 : 0.4,
                  strokeWeight: i === index ? 6 : 4,
                  zIndex: i === index ? 999 : i,
                });
              });
              markerRefs.current[index]?.forEach((m) => m.setVisible(true));
            });

            polyline.addListener("mouseout", () => {
              polylineRefs.current.forEach((p) => {
                p.setOptions({ strokeOpacity: 0.85, strokeWeight: 4 });
              });
              markerRefs.current[index]?.forEach((m) => m.setVisible(false));
            });

            polylineRefs.current[index] = polyline;
          }
        },
      );
    });
  }, [isLoaded, map]);

  return (
    <div className={styles.map}>
      {sidePopupSlice.isShowControl && (
        <div className={styles.management}>
          <div className={styles.header}>
            <h3>รอบรถวันสงกรานต์</h3>
            <button onClick={() => dispatch(controlClose())} type="button">
              <IconSvgMono size={16} src="/icon/pip-down.svg"></IconSvgMono>
            </button>
          </div>
          <div className={styles.stateControl}>
            <button onClick={() => setIsVehicleState(true)} type="button">
              ยานพาหนะ
            </button>
            <button onClick={() => setIsVehicleState(false)} type="button">
              ออเดอร์
            </button>
          </div>
          <button
            onClick={() => dispatch(detailOpen())}
            className={styles.vehicleContainer}
          >
            {isVehicleState ? (
              <div>
                <VehicleCard></VehicleCard>
              </div>
            ) : (
              <div>
                <OrderCard></OrderCard>
              </div>
            )}
          </button>
        </div>
      )}
      <div className={styles.containerMap}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            zoom={8}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onRightClick={(e) => {
              const lat = e.latLng?.lat() ?? 0;
              const lng = e.latLng?.lng() ?? 0;
              dispatch(setLatLng({ lat, lng }));
            }}
            options={{
              clickableIcons: false,
            }}
          ></GoogleMap>
        ) : (
          <div>wait for map response</div>
        )}
      </div>
    </div>
  );
};

export default MapWorkspace;
