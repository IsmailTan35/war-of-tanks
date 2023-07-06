import { Circle, Cylinder, Ring, Tube } from "@react-three/drei";
import React from "react";
import { BackSide, DoubleSide, RingGeometry, TubeGeometry } from "three";
import * as THREE from "three";
const BombardmentArea = () => {
  const radius = 16;
  const tubeRadius = 0.2;
  const radialSegments = 16;
  const tubularSegments = 128;

  const geometry = new THREE.TorusGeometry(
    radius,
    tubeRadius,
    radialSegments,
    tubularSegments
  );
  const material = new THREE.MeshStandardMaterial({
    color: "red",
    metalness: 0.5,
    roughness: 0.5,
    side: THREE.DoubleSide,
    emissiveIntensity: 0.5,
  });
  const material2 = new THREE.MeshStandardMaterial({
    color: "red",
    metalness: 0.5,
    roughness: 0.5,
    side: THREE.DoubleSide,
    emissiveIntensity: 0.5,
    opacity: 0.2,
    transparent: true,
  });
  return (
    <>
      <group position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={geometry} material={material} position={[0, 0, 0]} />
        <Circle args={[16, 128]} position={[0, 0.5, 0]} material={material2} />
      </group>
    </>
  );
};

export default BombardmentArea;
3;
