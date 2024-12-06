import type { NextApiRequest, NextApiResponse } from "next";
import { Chance } from "chance";

const chance = new Chance(42);

const getGaussianSeriesData = (
  mean: [number, number],
  stdev: [number, number] = [0.5, 0.5],
  N: number = 50
) => {
  return [...Array(N)].map((_, i) => {
    const x =
      Math.sqrt(-2.0 * Math.log(1 - chance.floating({ min: 0, max: 0.99 }))) *
        Math.cos(2.0 * Math.PI * chance.floating({ min: 0, max: 0.99 })) *
        stdev[0] +
      mean[0];
    const y =
      Math.sqrt(-2.0 * Math.log(1 - chance.floating({ min: 0, max: 0.99 }))) *
        Math.cos(2.0 * Math.PI * chance.floating({ min: 0, max: 0.99 })) *
        stdev[1] +
      mean[1];
    return { x, y, z: x + y, id: `${mean.join(",")}${i}` };
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const seriesData = [
    ...getGaussianSeriesData([-1, -1]),
    ...getGaussianSeriesData([-1, 1]),
    ...getGaussianSeriesData([1, 1]),
    ...getGaussianSeriesData([1, -1]),
  ];

  res.status(200).json(seriesData);
}