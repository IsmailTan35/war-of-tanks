import React, { useEffect } from "react";
import { Edges } from "@react-three/drei";
import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from "three";

const Hull = () => {
  const [geometry, setGeometry] = React.useState<any>(null);
  useEffect(() => {
    const prvGeometry: any = new BoxGeometry(3, 1, 2, 16, 16, 16);
    const positionAttribute = prvGeometry.getAttribute("position");

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);
      const distance = Math.sqrt(x * x + y * y + z * z);
      const scale = 1 - distance * 0.1;
      positionAttribute.setXYZ(i, x * scale, y * scale, z * scale);
    }

    positionAttribute.needsUpdate = true;
    setGeometry(prvGeometry);
  }, []);

  return (
    <>
      <mesh>
        <meshStandardMaterial color={0x637f0e} />
        <boxGeometry args={[3, 1, 5]} />
        <Edges color="black" />
      </mesh>
    </>
  );
};

export default Hull;
