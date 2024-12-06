import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const data = [
    {
      tracking_no: 84564564,
      name: "Camera Lens",
      fat: 40,
      carbs: 2,
      protein: 40570,
    },
    {
      tracking_no: 98764564,
      name: "Laptop",
      fat: 300,
      carbs: 0,
      protein: 180139,
    },
    {
      tracking_no: 98756325,
      name: "Mobile",
      fat: 355,
      carbs: 1,
      protein: 90989,
    },
    {
      tracking_no: 98652366,
      name: "Handset",
      fat: 50,
      carbs: 1,
      protein: 10239,
    },
    {
      tracking_no: 13286564,
      name: "Computer Accessories",
      fat: 100,
      carbs: 1,
      protein: 83348,
    },
    { tracking_no: 86739658, name: "TV", fat: 99, carbs: 0, protein: 410780 },
    {
      tracking_no: 13256498,
      name: "Keyboard",
      fat: 125,
      carbs: 2,
      protein: 70999,
    },
    { tracking_no: 98753263, name: "Mouse", fat: 89, carbs: 2, protein: 10570 },
    {
      tracking_no: 98753275,
      name: "Desktop",
      fat: 185,
      carbs: 1,
      protein: 98063,
    },
    {
      tracking_no: 98753291,
      name: "Chair",
      fat: 100,
      carbs: 0,
      protein: 14001,
    },
  ];
  res.status(200).json(data);
};
export default handler;
