import React, { useEffect, useRef, useState } from "react";
import Hull from "./Hull";
import Turret from "./Turret";
import Tracks from "./Tracks";
import { PerspectiveCamera } from "@react-three/drei";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useWheels } from "@/app/hooks/useWheel";
import { useControls } from "@/app/hooks/useControls";
import { WheelDebug } from "../WheelDebug";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

const Tank = () => {
  const width = 3;
  const height = 1;
  const front = 2.5;
  const wheelRadius = 0.5;
  const [radyanX, setRadyanX] = useState(180);
  const [radyanY, setRadyanY] = useState(110);
  const chassisBodyArgs: any = [width, height, front * 2];
  const [chassisBody, chassisApi]: any = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      position: [0, 1, 0],
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

  const handleMouseMove = (event: any) => {
    setRadyanX(prv => prv + event.movementX * 0.2);
    setRadyanY(prv => {
      const fixedData = prv - event.movementY * 2;
      const result = fixedData > 110 ? 110 : fixedData < 90 ? 90 : fixedData;
      return result;
    });
  };

  useEffect(() => {
    document.body.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [document.body]);
  useFrame(({ camera }) => {
    if (chassisApi) {
      const position = new Vector3();
      chassisBody.current.getWorldPosition(position);
      // chassisBody.current.getWorldPosition(position);
      // camera.getWorldPosition(position);
      // console.log(chassisBody);
    }
  });
  return (
    <>
      <group ref={vehicle} layers={1} name="tank">
        <group ref={chassisBody} layers={1} name="tank-body">
          <boxGeometry args={chassisBodyArgs} />
          <meshBasicMaterial
            transparent={true}
            opacity={0.25}
            color={"black"}
          />
          <Camera tankRef={chassisBody} />
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
  const cameraRef = useRef<any>();

  return (
    <PerspectiveCamera ref={cameraRef} position={[10, -10, 10]} makeDefault />
  );
};
export default Tank;
