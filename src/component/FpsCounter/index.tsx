import React, { useEffect, useState } from "react";

const FPSCounter = () => {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();

    const calculateFPS = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - startTime;
      frameCount++;

      if (deltaTime >= 1000) {
        const calculatedFps = Math.round((frameCount * 1000) / deltaTime);
        setFps(calculatedFps);
        frameCount = 0;
        startTime = currentTime;
      }

      requestAnimationFrame(calculateFPS);
    };

    calculateFPS();

    // return () => cancelAnimationFrame(calculateFPS);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: 5,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>FPS:</div>
      <div>{fps}</div>
    </div>
  );
};

export default FPSCounter;
