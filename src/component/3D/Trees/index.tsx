import React, { memo, useEffect, useState } from "react";
import Tree from "./Tree";
import { getSeedRandomPosition } from "@/utils/getRandomPosition";
import { useAppSelector } from "@/store";

function calculateDistance(point1: any, point2: any) {
  const dx = point2[0] - point1[0];
  const dy = point2[1] - point1[1];
  const dz = point2[2] - point1[2];

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

const Trees = (props: any) => {
  const { setSeed, seed } = props;
  const user = useAppSelector(state => state.tanksPosition.player);
  const [treesArr, setTreesArr] = useState<any[]>([]);
  const [check, setCheck] = useState<boolean>(true);
  const [firstCheck, setFirstCheck] = useState<boolean>(false);

  useEffect(() => {
    if (!setSeed) return;
    const trees = Array.from({ length: 500 }, (_, index) =>
      getSeedRandomPosition(1 * seed + index, undefined, undefined, 3)
    );
    setTreesArr(trees);
  }, [seed]);

  useEffect(() => {
    let timeoutID: any;
    if (!check || treesArr.length == 0 || !user || !firstCheck) {
      timeoutID = setTimeout(() => {
        setCheck(!check);
      }, 2500);
      return;
    }
    const trees = treesArr.map(item => {
      const distance = calculateDistance(item.position, user);
      if (distance > 300) {
        return {
          ...item,
          show: false,
        };
      }
      return {
        ...item,
        show: true,
      };
    });
    setTreesArr(trees);
    setCheck(false);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [check]);

  useEffect(() => {
    setTimeout(() => {
      setFirstCheck(true);
    }, 5000);
  }, []);

  return (
    <>
      {treesArr.length >= 0
        ? treesArr.map(
            (item, index) =>
              !item.isDestroy && (
                <Tree
                  key={index}
                  {...{ position: item.position, setTreesArr, show: item.show }}
                  idx={index}
                />
              )
          )
        : null}
    </>
  );
};

export default memo(Trees);
