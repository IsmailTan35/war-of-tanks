import { useEffect, useRef, useState } from "react";
import { SphereGeometry } from "three";

const SmokeParticles = (props: any) => {
  const { isActive } = props;
  const points = useRef<any>(null);
  const [radius, setRadius] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    let isBigger = false;
    let intervalId = setInterval(() => {
      if (points.current && points.current.geometry instanceof SphereGeometry) {
        setRadius(prv => {
          const newGeometry = new SphereGeometry(prv, 60, 60);
          points.current.geometry.dispose(); // Dispose the old geometry
          points.current.geometry = newGeometry; // Assign the new geometry,
          if (!isBigger && prv > 0.5) {
            isBigger = true;
            return prv;
          }
          if (isBigger && prv < 0.1) {
            clearInterval(intervalId);
            return prv;
          }
          return prv + (isBigger ? -0.1 : 0.1);
        });
      }
    }, 25);

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive]);

  useEffect(() => {}, []);
  return (
    <points ref={points} position={[0, -2.7, 0]}>
      <sphereGeometry args={[0, 60, 60]} />
      <pointsMaterial color={0xaaaaaa} size={0.015} sizeAttenuation />
    </points>
  );
};

export default SmokeParticles;
