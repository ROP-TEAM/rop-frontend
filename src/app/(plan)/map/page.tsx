"use client";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { Polyline } from "@react-google-maps/api";
import { OrderCard } from "@/components/ui/orderCard/orderCard";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./map.module.scss";
import { VehicleCard } from "@/components/ui/VehicleCard/ControlCard";
import IconSvgMono from "@/components/Icon/SvgIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  controlClose,
  detailClose,
  detailOpen,
  DetailToggle,
} from "@/app/features/sidePopup/sidePopupSlice";
import { RootState } from "@/app/store";
import { setLatLng } from "@/app/features/mapClick/mapClickSlice";
import { addVehicle } from "@/app/features/detailVehicle/detailVehicleSlice";
import { Vehicle } from "@/types/api.types";
const MapWorkspace = () => {
  const sidePopupSlice = useSelector((state: RootState) => state.sidePopup);
  const dispatch = useDispatch();
  const optimizeResult = useSelector(
    (state: RootState) => state.optimize.optimize,
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

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

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

  const polylineRefs = useRef<google.maps.Polyline[]>([]);
  const markerRefs = useRef<google.maps.Marker[][]>([]);
  const activePolylineRefs = useRef<number | null>(null);

  const setPolyLineStyles = (selectIndex: number) => {
    polylineRefs.current.forEach((p, i) => {
      p.setOptions({
        strokeOpacity: i === selectIndex ? 1.0 : 0.4,
        strokeWeight: i === selectIndex ? 6 : 4,
        zIndex: i === selectIndex ? 999 : i,
      });
    });
    markerRefs.current[selectIndex]?.forEach((m) => m.setVisible(true));
  };

  const clearPolyLineStyles = () => {
    polylineRefs.current.forEach((p) => {
      p.setOptions({ strokeOpacity: 0.85, strokeWeight: 4 });
    });
    activePolylineRefs.current = null;
    markerRefs.current.forEach((c) => {
      c?.forEach((m) => m.setVisible(false));
    });
  };

  useEffect(() => {
    if (!isLoaded || !map || !optimizeResult) return;
    const depotLat = optimizeResult.depotLat;
    const depotLon = optimizeResult.depotLon;
    if (!depotLat || !depotLon) return;
    if (!optimizeResult.routes || optimizeResult.routes.length === 0) return;

    optimizeResult.routes.forEach((vehicle, index) => {
      const service = new google.maps.DirectionsService();
      const route = vehicle.stops;

      service.route(
        {
          origin: {
            lat: depotLat,
            lng: depotLon,
          },
          destination: {
            lat: depotLat,
            lng: depotLon,
          },
          waypoints: route.map((n) => ({
            location: { lat: n.desLatitude, lng: n.desLongitude },
            stopover: true,
          })),
          optimizeWaypoints: false,
          travelMode: google.maps.TravelMode.DRIVING,
        },

        (result, status) => {
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
                title: stop.name ?? `Stop`,
                label: {
                  text: `${String(stopIndex + 1)} ${vehicle.skills?.some((s) => s.name == stop.skill?.name) ? "!" : ""}`,
                  color: "#FFFFFF",
                  fontSize: "0.825rem",
                  fontWeight: "bold",
                },
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: "red",
                  fillOpacity: 1,
                  strokeColor: "#ffffff",
                  strokeWeight: 2,
                },
              });
            });
            markerRefs.current[index] = markers;
            polyline.addListener("click", () => {
              console.log();
              const vehicleIdx = {
                ...vehicle,
                id: index,
              };
              dispatch(addVehicle(vehicleIdx));
              dispatch(DetailToggle());
              const activeIndex = activePolylineRefs.current;
              const exit = activeIndex !== null;
              if (exit) {
                markerRefs.current[activeIndex].forEach((m) =>
                  m.setVisible(false),
                );
              }
              setPolyLineStyles(index);
              activePolylineRefs.current = index;
            });
            polyline.addListener("mouseover", () => {
              if (activePolylineRefs.current !== null) return;
              polylineRefs.current.forEach((p, i) => {
                p.setOptions({
                  strokeOpacity: i === index ? 1.0 : 0.4,
                  strokeWeight: i === index ? 6 : 4,
                  zIndex: i === index ? 999 : i,
                });
              });

              markerRefs.current[index]?.forEach((m, idm) =>
                m.setVisible(true),
              );
            });

            polyline.addListener("mouseout", () => {
              if (activePolylineRefs.current !== null) return;
              clearPolyLineStyles();
            });

            polylineRefs.current[index] = polyline;
          }
        },
      );
    });
  }, [isLoaded, map, optimizeResult]);
  useEffect(() => {
    if (!map) return;

    const listener = map.addListener("click", () => {
      dispatch(detailClose());

      activePolylineRefs.current = null;
      clearPolyLineStyles();

      markerRefs.current.forEach((markers) => {
        markers?.forEach((m) => m.setVisible(false));
      });
    });

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [map]);

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
          <div className={styles.controlContainer}>
            {isVehicleState ? (
              <div className={styles.vehicleCardContainer}>
                {optimizeResult.routes.map((r, index) => (
                  <VehicleCard
                    key={index}
                    name={r.name}
                    id={index}
                    model={r.model}
                    capacity={r.capacity}
                    plateNumber={r.plateNumber}
                    workTimeStart={r.workTimeStart}
                    workTimeEnd={r.workTimeEnd}
                    breakTimeStart={r.breakTimeStart}
                    breakTimeEnd={r.breakTimeEnd}
                    skills={r.skills}
                  ></VehicleCard>
                ))}
              </div>
            ) : (
              <div className={styles.orderCardContainer}>
                {optimizeResult.routes.map((vehicle) => {
                  return vehicle.stops?.map((order) => {
                    return (
                      <OrderCard
                        name={order.name}
                        capacity={order.capacity}
                        skill={order.skill}
                        timeWindowStart={order.timeWindowStart}
                        timeWindowEnd={order.timeWindowEnd}
                        desLatitude={order.desLatitude}
                        desLongitude={order.desLongitude}
                        serviceTime={order.serviceTime}
                        type={order.type}
                        priority={order.priority}
                        key={order.id}
                      />
                    );
                  });
                })}
              </div>
            )}
          </div>
        </div>
      )}
      <div className={styles.containerMap}>
        {isLoaded ? (
          <GoogleMap
            onClick={() => {
              clearPolyLineStyles();
            }}
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
