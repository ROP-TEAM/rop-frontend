"use client";
import { Modal } from "@/components/Modal/Modal/Modal";
import { useEffect, useState } from "react";
import { VehicleUpload } from "@/components/Modal/VehicleUpload/VehicleUpload";
const Vehicle = () => {
  const [isUpload, setIsUpload] = useState<boolean>(true);
  return (
    <div>
      <Modal
        isActive={isUpload}
        marginTop="4rem"
        onClose={() => setIsUpload(false)}
      >
        <VehicleUpload></VehicleUpload>
      </Modal>
    </div>
  );
};
export default Vehicle;
