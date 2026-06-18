"use client";
import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import { Polyline } from "@react-google-maps/api";
import { OrderCard } from "@/components/ui/orderCard/orderCard";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./mock.module.scss";
import { VehicleCard } from "@/components/ui/VehicleCard/ControlCard";
import IconSvgMono from "@/components/Icon/SvgIcon";
import { useDispatch, useSelector } from "react-redux";
import mockOptimize from "@/data/waste/Bang_Kho_Laem _2.json";
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
import { setMapCenter } from "@/app/features/mapCenter/mapCetnerSlice";
import { Location } from "@/components/form/LocationInput/LocationInput.types";
const MockWorkspace = () => {
  const sidePopupSlice = useSelector((state: RootState) => state.sidePopup);
  const dispatch = useDispatch();
  const optimizeResult = useSelector(
    (state: RootState) => state.optimize.optimize,
  );
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeCard, setActiveCard] = useState({ vehicle: -1, order: -1 });

  const [isVehicleState, setIsVehicleState] = useState<boolean>(true);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "";
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });
  let totalDistanceMeters = 0;
  let completedRoutes = 0;
  const center = useSelector((state: RootState) => state.mapCenter);
  useEffect(() => {
    if (!map || !mockOptimize) return;
    const lat = mockOptimize?.depot_lat ?? 16.0;
    const lng = mockOptimize?.depot_lng ?? 103;

    if (lat == null || lng == null) return;

    map.panTo({ lat, lng });
    map.setZoom(18);
  }, [map, mockOptimize]);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.setZoom(18);
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
    if (!isLoaded || !map || !mockOptimize) return;
    const depotLat = mockOptimize.depotLat;
    const depotLon = mockOptimize.depotLon;
    if (!depotLat || !depotLon) return;
    if (!mockOptimize.routes || mockOptimize.routes.length === 0) return;

    mockOptimize.routes.forEach((vehicle, index) => {
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
            const legs = result.routes[0].legs;

            const routeDistanceMeters = legs
              .slice(1, -1)
              .reduce((sum, leg) => sum + (leg.distance?.value ?? 0), 0);

            const routeDurationSeconds = legs
              .slice(1, -1)
              .reduce((sum, leg) => sum + (leg.duration?.value ?? 0), 0);

            totalDistanceMeters += routeDistanceMeters;
            completedRoutes++;

            console.log(`[ROUTE ${index}]`, {
              vehicle: vehicle.name,
              stops: route.length,
              distanceKm: (routeDistanceMeters / 1000).toFixed(2),
              durationHr: (routeDurationSeconds / 3600).toFixed(2),
            });

            console.log(
              `[PROGRESS] ${completedRoutes}/${mockOptimize.routes.length}`,
            );

            if (completedRoutes === mockOptimize.routes.length) {
              console.log("===================================");
              console.log(
                "TOTAL DISTANCE (WITHOUT DEPOT):",
                (totalDistanceMeters / 1000).toFixed(2),
                "km",
              );
              console.log(
                "AVERAGE DISTANCE:",
                (
                  totalDistanceMeters /
                  mockOptimize.routes.length /
                  1000
                ).toFixed(2),
                "km/route",
              );
              console.log("===================================");
            }

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
                position: {
                  lat: stop.desLatitude,
                  lng: stop.desLongitude,
                },
                map,
                visible: false,
                title: stop.name ?? "Stop",
                label: {
                  text: `${stopIndex + 1}`,
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
              const vehicleIdx = {
                ...vehicle,
                id: index,
              };

              dispatch(addVehicle(vehicleIdx));
              dispatch(detailOpen());

              const activeIndex = activePolylineRefs.current;

              if (activeIndex !== null) {
                markerRefs.current[activeIndex]?.forEach((m) =>
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

              markerRefs.current[index]?.forEach((m) => m.setVisible(true));
            });

            polyline.addListener("mouseout", () => {
              if (activePolylineRefs.current !== null) return;

              clearPolyLineStyles();
            });

            polylineRefs.current[index] = polyline;
          } else {
            console.error(`[ROUTE ${index}] Directions failed`, status);
          }
        },
      );
    });
  }, [isLoaded, map, mockOptimize]);

  const handleOrderCardClick = (idv: number, ido: number) => {
    const vehicle = mockOptimize.routes[idv];
    if (!vehicle) return;
    setActiveCard({ vehicle: idv, order: ido });
    if (activePolylineRefs.current !== null) {
      markerRefs.current[activePolylineRefs.current]?.forEach((m) =>
        m.setVisible(false),
      );
    }

    const vehicleIdx = { ...vehicle, id: idv };
    dispatch(addVehicle(vehicleIdx));
    dispatch(detailOpen());

    setPolyLineStyles(idv);
    activePolylineRefs.current = idv;

    const stop = vehicle.stops?.[ido];
    if (stop && map) {
      map.panTo({ lat: stop.desLatitude, lng: stop.desLongitude });
    }
  };

  const handleVehicleCardClick = (index: number) => {
    const vehicle = mockOptimize.routes[index];
    if (!vehicle) return;

    if (activePolylineRefs.current !== null) {
      markerRefs.current[activePolylineRefs.current]?.forEach((m) =>
        m.setVisible(false),
      );
    }
    setActiveCard({ order: -1, vehicle: index });
    const vehicleIdx = { ...vehicle, id: index };
    dispatch(addVehicle(vehicleIdx));
    dispatch(detailOpen());

    setPolyLineStyles(index);
    activePolylineRefs.current = index;

    const firstStop = vehicle.stops?.[0];
    if (firstStop && map) {
      map.panTo({ lat: firstStop.desLatitude, lng: firstStop.desLongitude });
    }
  };
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
            <button
              className={styles.stateControl_action}
              style={
                {
                  "--background-color": isVehicleState ? "var(--p-100)" : "",
                } as React.CSSProperties
              }
              onClick={() => setIsVehicleState(true)}
              type="button"
            >
              ยานพาหนะ
            </button>
            <button
              className={styles.stateControl_action}
              style={
                {
                  "--background-color": isVehicleState ? "" : "var(--p-100)",
                } as React.CSSProperties
              }
              onClick={() => setIsVehicleState(false)}
              type="button"
            >
              ออเดอร์
            </button>
          </div>
          <div className={styles.controlContainer}>
            {isVehicleState ? (
              <div className={styles.vehicleCardContainer}>
                {mockOptimize.routes.map((r, index) => (
                  <div
                    key={index}
                    onClick={() => handleVehicleCardClick(index)}
                  >
                    <VehicleCard
                      isSelected={activeCard.vehicle == index}
                      name={r.name}
                      id={index}
                      model={r.name}
                      capacity={r.capacity}
                      plateNumber={r.name}
                      workTimeStart={r.workTimeStart}
                      workTimeEnd={r.workTimeEnd}
                    ></VehicleCard>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.orderCardContainer}>
                {mockOptimize.routes.map((vehicle, idv) => {
                  return vehicle.stops?.map((order, ido) => {
                    return (
                      <div
                        key={ido}
                        onClick={() => handleOrderCardClick(idv, ido)}
                      >
                        <OrderCard
                          id={ido}
                          isSelect={
                            idv == activeCard.vehicle && ido == activeCard.order
                          }
                          name={order.name ?? "ไม่ทราบชื่อ"}
                          capacity={order.capacity}
                          timeWindowStart={order.timeWindowStart}
                          timeWindowEnd={order.timeWindowEnd}
                          desLatitude={order.desLatitude}
                          desLongitude={order.desLongitude}
                          serviceTime={order.serviceTime}
                          type={order.type}
                          priority={order.priority}
                          key={order.id}
                        />
                      </div>
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

export default MockWorkspace;
