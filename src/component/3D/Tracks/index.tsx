import { Edges, Sphere } from "@react-three/drei";
import React, { useEffect } from "react";

const Tracks = (props: any) => {
  const [show, setShow] = React.useState(true);
  const { direction, radius = [0.6, 8] } = props;
  const ref = React.useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.rotation.x = 1.55;
    ref.current.rotation.z = 1.55;
    setTimeout(() => {
      setShow(false);
    }, 4000);
  }, [ref]);

  return (
    <>
      {show && (
        <mesh position={[direction == "left" ? 2 : -2, -1.5, 0]} ref={ref}>
          <mesh position={[-1.5, 0, 0]}>
            <sphereGeometry args={[0.6, 16]} />
            <meshStandardMaterial color={0x3e3f44} />
            <Edges color={"black"} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.6, 16]} />
            <meshStandardMaterial color={0x3e3f44} />
            <Edges color={"black"} />
          </mesh>
          <mesh position={[1.5, 0, 0]}>
            <sphereGeometry args={[0.6, 16]} />
            <meshStandardMaterial color={0x3e3f44} />
            <Edges color={"black"} />
          </mesh>
        </mesh>
      )}
    </>
  );
};

export default Tracks;