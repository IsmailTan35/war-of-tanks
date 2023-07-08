import { SocketContext } from "@/controller/Contex";
import { cameraActions, useAppDispatch } from "@/store";
import { useContext, useEffect, useState } from "react";

export const useControls = (vehicleApi, chassisApi) => {
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);
  let [controls, setControls] = useState({});
  const speed = 1550;
  useEffect(() => {
    const keyDownPressHandler = e => {
      if (e.key.toLowerCase() === "h") {
        dispatch(cameraActions.update());
        return;
      }
      setControls(controls => ({ ...controls, [e.key.toLowerCase()]: true }));
    };

    const keyUpPressHandler = e => {
      if (e.key.toLowerCase() === "h") {
        return;
      }
      setControls(controls => ({ ...controls, [e.key.toLowerCase()]: false }));
    };

    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    };
  }, []);

  useEffect(() => {
    if (!vehicleApi || !chassisApi) return;
    if (controls.w) {
      //front wheels
      vehicleApi.applyEngineForce(speed, 5);
      vehicleApi.applyEngineForce(speed, 4);
      //middle  wheels
      vehicleApi.applyEngineForce(speed, 3);
      vehicleApi.applyEngineForce(speed, 2);
      //rear wheels
      vehicleApi.applyEngineForce(speed, 1);
      vehicleApi.applyEngineForce(speed, 0);
    } else if (controls.s) {
      //front wheels
      vehicleApi.applyEngineForce(-speed, 5);
      vehicleApi.applyEngineForce(-speed, 4);
      //middle  wheels
      vehicleApi.applyEngineForce(-speed, 3);
      vehicleApi.applyEngineForce(-speed, 2);
      //rear wheels
      vehicleApi.applyEngineForce(-speed, 1);
      vehicleApi.applyEngineForce(-speed, 0);
    } else {
      //front wheels
      vehicleApi.applyEngineForce(0, 5);
      vehicleApi.applyEngineForce(0, 4);
      //middle  wheels
      vehicleApi.applyEngineForce(0, 3);
      vehicleApi.applyEngineForce(0, 2);
      //rear wheels
      vehicleApi.applyEngineForce(0, 1);
      vehicleApi.applyEngineForce(0, 0);
    }

    if (controls.a) {
      //front wheels
      vehicleApi.setSteeringValue(0.35, 5);
      vehicleApi.setSteeringValue(0.35, 4);
      //middle  wheels
      vehicleApi.setSteeringValue(-0.1, 3);
      vehicleApi.setSteeringValue(-0.1, 2);
      //rear wheels
      vehicleApi.setSteeringValue(-0.1, 1);
      vehicleApi.setSteeringValue(-0.1, 0);
    } else if (controls.d) {
      //front wheels
      vehicleApi.setSteeringValue(-0.35, 5);
      vehicleApi.setSteeringValue(-0.35, 4);
      //middle  wheels
      vehicleApi.setSteeringValue(0.1, 3);
      vehicleApi.setSteeringValue(0.1, 2);
      //rear wheels
      vehicleApi.setSteeringValue(0.1, 1);
      vehicleApi.setSteeringValue(0.1, 0);
    } else if (controls.b) {
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      socket.emit("hand-break");
    } else {
      for (let i = 0; i < 6; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }

    if (controls.r) {
      chassisApi.position.set(-1.5, 2, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
};
