"use client";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { DetailCard } from "@/components/ui/DetailCard/DetailCard";
import { useCallback, useState } from "react";
import styles from "./map.module.scss";
import { VehicleCard } from "./Component/VehicleCard/ControlCard";
import IconSvgMono from "@/components/Icon/SvgIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  controlClose,
  detailClose,
  detailOpen,
} from "@/app/features/sidePopup/sidePopupSlide";
import { RootState } from "@/app/store";
const MapWorkspace = () => {
  const sidePopupSlice = useSelector(
    (state: RootState) => state.sidePopupReducer,
  );
  const dispatch = useDispatch();
  const [manageState, setManageState] = useState<"vehicle" | "order">(
    "vehicle",
  );
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
      {sidePopupSlice.isShowControl && (
        <div className={styles.management}>
          <div className={styles.header}>
            <h3>รอบรถวันสงกรานต์</h3>
            <button onClick={() => dispatch(controlClose())} type="button">
              <IconSvgMono size={16} src="/icon/pip-down.svg"></IconSvgMono>
            </button>
          </div>
          <div className={styles.stateControl}>
            <button type="button">ยานพาหนะ</button>
            <button type="button">ออเดอร์</button>
          </div>
          <button
            onClick={() => dispatch(detailOpen())}
            className={styles.vehicleContainer}
          >
            <VehicleCard></VehicleCard>
          </button>
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
    </div>
  );
};

export default MapWorkspace;
