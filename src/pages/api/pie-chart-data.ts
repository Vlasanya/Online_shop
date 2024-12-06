import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const pieData = [
    { id: "1", label: "Category A", value: 40 },
    { id: "2", label: "Category B", value: 15 },
    { id: "3", label: "Category C", value: 22 },
    { id: "4", label: "Category D", value: 10 },
    { id: "5", label: "Category E", value: 23 },
  ];

  res.status(200).json(pieData);
}
