const getRandomPosition = (
  min: number = -250,
  max: number = 250,
  height: number = 4
): [number, number, number] => {
  const x = Math.random() * (max - min) + min;
  const y = height;
  const z = Math.random() * (max - min) + min;
  return [x, y, z];
};

function customRandom(number: number) {
  var x = Math.sin(number) * 10000;
  return x - Math.floor(x);
}

const getSeedRandomPosition = (
  seed: number,
  min: number = -250,
  max: number = 250,
  height: number = 4
): [number, number, number] => {
  const x = customRandom(seed + 1) * (max - min) + min;
  const y = height;
  const z = customRandom(seed + 2) * (max - min) + min;
  return [x, y, z];
};

export { getRandomPosition, getSeedRandomPosition };
