import React, { useContext, useEffect, useRef } from "react";
import Hull from "./Hull";
import Turret from "./Turret";
import Tracks from "./Tracks";
import { PerspectiveCamera } from "@react-three/drei";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useWheels } from "@/hooks/useWheel";
import { useControls } from "@/hooks/useControls";
import { WheelDebug } from "../WheelDebug";
import { Quaternion, Vector3 } from "three";
import { SocketContext } from "@/controller/Contex";
const Tank = (props: any) => {
  const { position } = props;
  const socket: any = useContext(SocketContext);
  const width = 3;
  const height = 1;
  const front = 2.5;
  const wheelRadius = 0.5;

  const chassisBodyArgs: any = [width, height, front * 2];
  const [chassisBody, chassisApi]: any = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      position: position,
    }),
    useRef(null)
  );

  const [wheels, wheelInfos]: any = useWheels(
    width,
    height,
    front,
    wheelRadius
  );
  const [vehicle, vehicleApi]: any = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null)
  );

  useControls(vehicleApi, chassisApi);
  useEffect(() => {
    const threshold = 0.005; // Eşik değeri (birim cinsinden)
    let intervalPositionID: any = null;
    let intervalQuanternionID: any = null;

    const handlePositionChange = (newPosition: any) => {
      const target: any = new Vector3();
      chassisBody.current.getWorldPosition(target);

      const dx = newPosition[0] - target.x;
      const dy = newPosition[1] - target.y;
      const dz = newPosition[2] - target.z;

      if (
        Math.abs(dx) < threshold &&
        Math.abs(dy) < threshold &&
        Math.abs(dz) < threshold
      ) {
        return;
      }
      socket.emit("position", {
        x: target.x,
        y: target.y,
        z: target.z,
      });
    };
    const handleQuaternionChange = (newPosition: any) => {
      const target: any = new Quaternion();
      chassisBody.current.getWorldQuaternion(target);

      const dx = newPosition[0] - target.x;
      const dy = newPosition[1] - target.y;
      const dz = newPosition[2] - target.z;
      const dw = newPosition[3] - target.w;

      if (
        Math.abs(dx) < threshold &&
        Math.abs(dy) < threshold &&
        Math.abs(dz) < threshold &&
        Math.abs(dw) < threshold
      ) {
        return;
      }
      socket.emit("quaternion", {
        x: target.x,
        y: target.y,
        z: target.z,
        w: target.w,
      });
    };
    const unsubscribePosition =
      chassisApi.position.subscribe(handlePositionChange);
    const unsubscribeQuaternion = chassisApi.quaternion.subscribe(
      handleQuaternionChange
    );

    intervalPositionID = setInterval(() => {
      const target: any = new Vector3();
      chassisBody.current.getWorldPosition(target);
      socket.emit("position", {
        x: target.x,
        y: target.y,
        z: target.z,
      });
    }, 1500);
    intervalQuanternionID = setInterval(() => {
      const target: any = new Quaternion();
      chassisBody.current.getWorldQuaternion(target);
      socket.emit("quaternion", {
        x: target.x,
        y: target.y,
        z: target.z,
        w: target.w,
      });
    }, 250);
    return () => {
      unsubscribePosition();
      unsubscribeQuaternion();
      clearInterval(intervalPositionID);
      clearInterval(intervalQuanternionID);
    };
  }, [chassisApi]);

  return (
    <>
      <group ref={vehicle} name="tank">
        <group ref={chassisBody} name="tank-body">
          <boxGeometry args={chassisBodyArgs} />
          <meshBasicMaterial
            transparent={true}
            opacity={0.25}
            color={"black"}
          />
          <Camera />
          <Turret />
          <Hull />
          <Tracks direction={"left"} />
          <Tracks direction={"right"} />
        </group>

        <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
        <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
        <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
        <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
        <WheelDebug wheelRef={wheels[4]} radius={wheelRadius} />
        <WheelDebug wheelRef={wheels[5]} radius={wheelRadius} />
      </group>
    </>
  );
};

const Camera = (props: any) => {
  return (
    <PerspectiveCamera
      position={[10, -10, 10]}
      makeDefault
      name="thirdPersonCamera"
    />
  );
};
export default Tank;
