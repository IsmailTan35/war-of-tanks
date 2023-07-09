import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { Cylinder, Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { SocketContext } from "@/controller/Contex";
import { useAppSelector } from "@/store";
import MainGun from "@/component/3D/MainGun";
import Weaponry from "@/component/Tank/Weaponry";

const Turret = (props: any) => {
  const { id } = props;
  const socket: any = useContext<any>(SocketContext);
  const [degree, setDegree] = useState<{ x: number; y: number }>({
    x: 180,
    y: 110,
  });
  const { spectatorMode } = useAppSelector(state => state.camera);
  const selectedCameraID = useAppSelector(state => state.camera.selectedID);

  const ref = useRef<any>(null);
  const mainGunRef = useRef<any>();

  useEffect(() => {
    if (spectatorMode) return;
    const handleMouseMove = (event: any) => {
      if (!event.movementX || !event.movementY) return;
      setDegree(prv => {
        const dataX = prv.x - event.movementX * 0.2;
        const dataY = prv.y - event.movementY * 0.5;
        const fixedDataY = dataY > 120 ? 120 : dataY < 80 ? 80 : dataY;
        socket.emit("turret-rotation", { x: dataX - 90, y: fixedDataY });
        return {
          x: dataX,
          y: fixedDataY,
        };
      });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [spectatorMode]);

  useFrame(state => {
    const turret = ref.current;
    if (!mainGunRef.current || !turret) return;
    var angle = MathUtils.degToRad(degree.x - 90);
    var angleX = MathUtils.degToRad(degree.x);
    var angleY = MathUtils.degToRad(degree.y);

    ref.current.rotation.y = angle;
    mainGunRef.current.rotation.z = angleY;

    var target = new Vector3();
    mainGunRef.current.getWorldPosition(target);

    if (selectedCameraID !== 0) return;
    var cameraDistance = 20;
    state.camera.position.set(0, 5, -cameraDistance);
    state.camera.position.applyAxisAngle(new Vector3(0, 1, 0), angleX);
    state.camera.lookAt(target.x, target.y, target.z);
  });

  return (
    <>
      <group position={[0, 1, 1]} ref={ref} name={"turret" + id}>
        <mesh position={[0, 0, 0]}>
          <Cylinder args={[1, 1.3, 0.9, 60]}>
            <Edges color="white" />
            <meshStandardMaterial color="darkgreen" />
          </Cylinder>
        </mesh>
        <MainGun {...{ id }} ref={mainGunRef}>
          <Weaponry
            {...{
              id,
            }}
          />
        </MainGun>
      </group>
    </>
  );
};

export default memo(Turret);
