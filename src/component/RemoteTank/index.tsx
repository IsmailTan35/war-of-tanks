import { useRemoteControls } from "@/hooks/useRemoteControls";
import { useWheels } from "@/hooks/useWheel";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import React, { useEffect, useRef } from "react";
import Tracks from "../Tank/Tracks";
import Hull from "../Tank/Hull";
import Turret from "./Turret";
import { useFrame, useThree } from "@react-three/fiber";
import { WheelDebug } from "../WheelDebug";
import { Text } from "@react-three/drei";
import Hitbox from "../HitBox";

const width = 3;
const height = 1;
const front = 1.5;
const wheelRadius = 0.5;
const chassisBodyArgs: any = [width, height, front * 2];

const RemoteTank = (props: any) => {
  const { position, item } = props;
  const { scene } = useThree();
  const nameRef = useRef<any>(null);
  const [chassisBody, chassisApi]: any = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      position: position || [0, 1, 0],
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

  useEffect(() => {
    chassisApi.name = "remote-tank-body" + item.id;
  }, [item.id]);
  useRemoteControls(vehicleApi, chassisApi);

  useEffect(() => {
    return () => {
      scene.remove(chassisBody.current);
    };
  }, []);

  useFrame(({ camera }) => {
    const cameraPosition = camera.position;

    const textRotation = Math.atan2(cameraPosition.x, cameraPosition.z);
    nameRef.current.rotation.y = textRotation;
  });
  return (
    <>
      <group ref={vehicle} name={"remote-tank" + item.id}>
        <group ref={chassisBody} name={"remote-tank-body" + item.id}>
          <boxGeometry args={chassisBodyArgs} />
          <meshBasicMaterial
            transparent={true}
            opacity={0.25}
            color={"black"}
          />
          <Hitbox name="remotePlayer" />
          <Turret id={item.id} />
          <Hull />
          <Tracks direction={"left"} />
          <Tracks direction={"right"} />
          <group position={[0, 3, -0.1]} ref={nameRef}>
            <mesh>
              <boxGeometry args={[3, 1, 0.2]} />
              <meshBasicMaterial color="red" />
            </mesh>
            <Text
              fontSize={0.5}
              letterSpacing={-0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 0.2]}
            >
              {item.name}
            </Text>
            <Text
              fontSize={0.5}
              letterSpacing={-0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
              position={[0, 0, -0.2]}
              rotation={[0, Math.PI, 0]}
            >
              {item.name}
            </Text>
          </group>
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

export default RemoteTank;
