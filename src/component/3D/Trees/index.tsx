import React, { memo, useEffect, useState } from "react";
import Tree from "./Tree";
import { getSeedRandomPosition } from "@/utils/getRandomPosition";

const Trees = (props: any) => {
  const { setSeed, seed } = props;
  const [treesArr, setTreesArr] = useState<any[]>([]);
  useEffect(() => {
    if (!setSeed) return;
    const trees = Array.from({ length: 500 }, (_, index) =>
      getSeedRandomPosition(1 * seed + index, undefined, undefined, 3)
    );
    setTreesArr(trees);
  }, [seed]);
  return (
    <>
      {treesArr.length >= 0
        ? treesArr.map((position, index) => (
            <Tree key={index} {...{ position }} idx={index} />
          ))
        : null}
    </>
  );
};

export default memo(Trees);
