import React, { memo, use, useEffect, useRef, useState } from "react";
import {
  Box,
  Edges,
  Environment,
  Hud,
  OrthographicCamera,
  Text,
} from "@react-three/drei";
import { useAppSelector } from "@/store";
import { BoxGeometry } from "three";

const CustomHud = () => {
  const counterRef = useRef<any>(null);
  const mapRef = useRef<any>(null);
  const [myPosition, setMyPosition] = useState<any>([0, 0, 0]);
  const { health } = useAppSelector((state) => state.health);
  const machineGunAmmo = useAppSelector((state) => state.ammo.machineGunAmmo);
  const cannonAmmo = useAppSelector((state) => state.ammo.cannonAmmo);
  const position = useAppSelector((state) => state.tanksPosition.player);
  const trees = useAppSelector((state) => state.tanksPosition.trees);
  const rocks = useAppSelector((state) => state.tanksPosition.rocks);
  const rmPlyr = useAppSelector((state) => state.tanksPosition.remotePlayers);
  const cameraOrtho = useRef<any>();
  useEffect(() => {
    const divede = 200;
    if (position) {
      setMyPosition([
        position[0] / divede,
        position[1] / divede,
        position[2] / divede,
      ]);
    }
  }, [position]);

  useEffect(() => {
    if (!counterRef.current || !mapRef.current) return;

    function resize() {
      const width = window.innerWidth / 2;
      const height = window.innerHeight / 2;

      cameraOrtho.current.left = -width;
      cameraOrtho.current.right = width;
      cameraOrtho.current.top = height;
      cameraOrtho.current.bottom = -height;
      cameraOrtho.current.updateProjectionMatrix();

      mapRef.current.position.set(width, height, 1);
      counterRef.current.position.set(-width, -height, 1);
    }
    cameraOrtho.current.position.z = 2;

    counterRef.current.center.set(-1.55, -0.55);
    counterRef.current.scale.set(90, 75, 1);

    mapRef.current.center.set(150, 150);
    mapRef.current.scale.set(1, 1, 1);

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [counterRef]);
  console.log(myPosition);
  return (
    <>
      <Hud>
        <OrthographicCamera makeDefault ref={cameraOrtho} />
        <Environment preset="forest" />
        <sprite ref={counterRef}>
          <boxGeometry args={[3.1, 1.1, 0.2]} />
          <spriteMaterial color="black" />
          <sprite position={[2.05, 1.05, 0]}>
            <boxGeometry args={[3.1, 1.1, 0.2]} />
            <spriteMaterial color="black" />
            <mesh position={[-1, 0, 0]}>
              <boxGeometry args={[1, 1, 0.2]} />
              <meshBasicMaterial color="red" />
              <Edges color={"black"} />
              <Text
                fontSize={0.5}
                letterSpacing={-0.1}
                color="white"
                anchorX="center"
                anchorY="middle"
                position={[0, 0, 0.2]}
              >
                {cannonAmmo}
              </Text>
            </mesh>
            <mesh>
              <boxGeometry args={[1, 1, 0.2]} />
              <meshBasicMaterial color="red" />
              <Edges color={"black"} />
              <Text
                fontSize={0.4}
                letterSpacing={-0.1}
                color="white"
                anchorX="center"
                anchorY="middle"
                position={[0, 0, 0.2]}
              >
                50/{machineGunAmmo}
              </Text>
            </mesh>
            <mesh position={[1, 0, 0]}>
              <boxGeometry args={[1, 1, 0.2]} />
              <meshBasicMaterial color="red" />
              <Edges color={"black"} />
              <Text
                fontSize={0.4}
                letterSpacing={-0.1}
                color="white"
                anchorX="center"
                anchorY="middle"
                position={[0, 0, 0.2]}
              >
                {health}
              </Text>
            </mesh>
          </sprite>
        </sprite>
        <sprite ref={mapRef}>
          <boxGeometry args={[250, 250, 0.1]} />
          <spriteMaterial color="darkgreen" />
        </sprite>
        {myPosition && (
          <FixedObje
            {...{
              objects: [myPosition],
              color: "blue",
              zIndex: 20,
            }}
          />
        )}
        {rmPlyr.length > 0 && <FixedObje objects={rmPlyr} color="blue" />}
        {trees.length === 500 && (
          <FixedObje {...{ objects: trees, color: "green" }} />
        )}
        {rocks.length === 100 && (
          <FixedObje {...{ objects: rocks, color: "white" }} />
        )}
      </Hud>
    </>
  );
};

const FixedObje = memo((props: any) => {
  const { objects, color } = props;
  return (
    <>
      {objects.map((item: any, idx: any) => {
        if (!item) return null;
        return (
          <FixedObje2
            key={idx}
            position={[item[0], item[2], 1]}
            color={color}
          />
        );
      })}
    </>
  );
});
const FixedObje2 = (props: any) => {
  const { position, color, zIndex } = props;
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.center.set(-705, -340);
    mapRef.current.scale.set(1, 1, 1);
    function resize() {
      const width = window.innerWidth / 2;
      const height = window.innerHeight / 2;

      mapRef.current.position.set(width, height, 1);
      mapRef.current.scale.set(1, 1, 1);

      mapRef.current.center.set(
        position[0] + width * 0.18,
        position[1] + width * 0.18
      );
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [mapRef, position]);

  return (
    <>
      <sprite ref={mapRef} position={[position[0], position[1], zIndex]}>
        <spriteMaterial color={color} />
        <circleGeometry args={[5, 30]} />
      </sprite>
    </>
  );
};
FixedObje.displayName = "FixedObje";

export default memo(CustomHud);
