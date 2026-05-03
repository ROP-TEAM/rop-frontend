"use client";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { DetailCard } from "@/components/ui/DetailCard/DetailCard";
import { useCallback, useState } from "react";
import styles from "./map.module.scss";
import { VehicleCard } from "./Component/VehicleCard/VehicleCard";
import IconSvgMono from "@/components/Icon/SvgIcon";
const MapWorkspace = () => {
  const [manageState, setManageState] = useState<"vehicle" | "order">(
    "vehicle",
  );
  const [isShowDetail, setIsShowDetail] = useState(true);
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 16.441879460231092,
    lng: 102.8275588872729,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey:
      // process.env.NEXT_PUBLIC_GOOGLE_API_KEY ??
      "",
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

  return (
    <div className={styles.map}>
      {isShowSidebar && (
        <div className={styles.management}>
          <div className={styles.header}>
            <h3>รอบรถวันสงกรานต์</h3>
            <button type="button">
              <IconSvgMono size={16} src="/icon/pip-down.svg"></IconSvgMono>
            </button>
          </div>
          <div className={styles.stateControl}>
            <button type="button">ยานพาหนะ</button>
            <button type="button">ออเดอร์</button>
          </div>
          <div
            onClick={() => setIsShowDetail((prev) => !prev)}
            className={styles.vehicleContainer}
          >
            <VehicleCard></VehicleCard>
          </div>
        </div>
      )}
      <div className={styles.containerMap}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={center}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onRightClick={(e) => {
              const lat = e.latLng?.lat();
              const lng = e.latLng?.lng();
              console.log({ lat, lng });
            }}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
        ) : (
          <div>wait for map response</div>
        )}
      </div>
      {isShowDetail && (
        <div>
          <DetailCard
            handleCloseDetail={() => setIsShowDetail(false)}
          ></DetailCard>
        </div>
      )}
    </div>
  );
};

export default MapWorkspace;
