import { useRemoteControls } from "@/hooks/useRemoteControls";
import { useWheels } from "@/hooks/useWheel";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import React, { useEffect, useRef } from "react";
import Tracks from "../Tank/Tracks";
import Hull from "../Tank/Hull";
import Turret from "./Turret";
import { useThree } from "@react-three/fiber";

const width = 3;
const height = 1;
const front = 2.5;
const wheelRadius = 0.5;
const chassisBodyArgs: any = [width, height, front * 2];

const RemoteTank = (props: any) => {
  const { position, item } = props;
  const { scene } = useThree();

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
          <Turret id={item.id} />
          <Hull />
          <Tracks direction={"left"} />
          <Tracks direction={"right"} />
        </group>
      </group>
    </>
  );
};

export default RemoteTank;
