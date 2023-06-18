import React, { useEffect } from "react";
import Connon from "./Connon";
const Weaponry = (props: any) => {
  const { connonAmmo = 5, radyanX, radyanY } = props;
  const [connonStep, setConnonStep] = React.useState<number>(-1);

  useEffect(() => {
    window.addEventListener("click", () => {
      setConnonStep(prev => {
        if (connonAmmo === prev) return prev;
        return prev + 1;
      });
    });
    return () => {
      window.removeEventListener("click", () => {
        console.log(213);
      });
    };
  }, []);

  return (
    <>
      {connonAmmo > 0
        ? Array.from({ length: connonAmmo }, (_, index) => (
            <Connon
              key={index}
              layer={index}
              {...{ connonStep, radyanX, radyanY }}
            />
          ))
        : null}
    </>
  );
};

export default Weaponry;
