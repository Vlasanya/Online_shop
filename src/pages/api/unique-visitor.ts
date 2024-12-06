import type { NextApiRequest, NextApiResponse } from "next";

const uniqueVisitorData = {
  week: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [
      { name: "Page Views", data: [31, 40, 28, 51, 42, 109, 100] },
      { name: "Sessions", data: [11, 32, 45, 32, 34, 52, 41] },
    ],
  },
  month: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    series: [
      {
        name: "Page Views",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35],
      },
      {
        name: "Sessions",
        data: [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41],
      },
    ],
  },
};
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const slot = req.query.slot;

  if (!slot || (slot !== "week" && slot !== "month")) {
    return res.status(400).json({ error: "Invalid slot value" });
  }

  if (slot === "month") {
    return res.status(200).json(uniqueVisitorData.month);
  }

  return res.status(200).json(uniqueVisitorData.week);
}

