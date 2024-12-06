import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const data = [
    {
      id: 1,
      title: "Revenue",
      count: "34,000",
      percentage: 45,
      isLoss: false,
      extra: "$500 more",
    },
    {
      id: 2,
      title: "Expenses",
      count: "15,000",
      percentage: 20,
      isLoss: true,
      extra: "$300 less",
    },
    {
      id: 3,
      title: "Profit",
      count: "19,000",
      percentage: 25,
      isLoss: false,
      extra: "$200 more",
    },
    {
      id: 4,
      title: "Total Sales",
      count: "$35,078",
      percentage: 59.4,
      isLoss: true,
      extra: "$20,395 less",
    },
  ];

  res.status(200).json(data);
}
