import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const series = [
      {
        label: "series 1",
        data: [2423, 2210, 764, 1879, 1478, 1935, 1023, 1547, 2356, 1987, 1543, 2254, 1962, 1336, 586, 1745, 1578, 2103, 1876, 1452],
        highlightScope: {
          highlight: "series",
          fade: "global",   
        },
      },
      {
        label: "series 2",
        data: [2362, 2254, 1962, 1336, 586, 1745, 1578, 2103, 1876, 1452, 2423, 2210, 764, 1879, 1478, 1935, 1023, 1547, 2356, 1987],
        highlightScope: {
          highlight: "series",
          fade: "global",
        },
      },
      {
        label: "series 3",
        data: [1864, 2025, 1457, 1573, 2387, 1204, 1532, 1895, 1740, 2145, 1748, 1456, 1800, 1527, 1873, 1624, 1427, 1985, 2154],
        highlightScope: {
          highlight: "series",
          fade: "global",
        },
      },
      {
        label: "series 4",
        data: [2101, 1648, 1372, 1567, 2234, 1984, 1756, 1930, 1543, 1890, 2103, 1876, 1452, 2423, 2210, 764, 1879, 1478, 1935],
        highlightScope: {
          highlight: "series",
          fade: "global",
        },
      },
      {
        label: "series 5",
        data: [1784, 2035, 1294, 1478, 1956, 1823, 2056, 1902, 2176, 1463, 1962, 1336, 586, 1745, 1578, 2103, 1876, 1452],
        highlightScope: {
          highlight: "series",
          fade: "global",
        },
      },
      {
        label: "series 6",
        data: [1523, 1947, 1768, 2304, 1432, 1725, 1892, 2341, 1786, 1904, 2101, 1648, 1372, 1567, 2234, 1984, 1756, 1930],
        highlightScope: {
          highlight: "series",
          fade: "global",
        },
      },
      {
        label: "series 7",
        data: [2045, 1792, 1594, 1908, 1687, 1435, 1936, 2058, 2234, 1726, 2101, 1648, 1372, 1567, 2234, 1984, 1756, 1930],
        highlightScope: {
          highlight: "series",
          fade: "global",
        },
      },
      {
        label: "series 8",
        data: [1738, 1954, 2342, 1674, 2038, 2102, 1904, 1497, 2053, 1564, 1784, 2035, 1294, 1478, 1956, 1823, 2056, 1902],
        highlightScope: {
          highlight: "series",
          fade: "global",
        },
      },
      {
        label: "series 9",
        data: [1873, 1624, 1427, 1985, 2154, 1768, 1574, 1893, 1742, 1997, 1523, 1947, 1768, 2304, 1432, 1725, 1892, 2341],
        highlightScope: {
          highlight: "series",
          fade: "global",
        },
      },
      {
        label: "series 10",
        data: [2216, 1583, 1902, 1856, 1623, 1408, 2347, 1824, 2046, 1723, 2045, 1792, 1594, 1908, 1687, 1435, 1936, 2058],
        highlightScope: {
          highlight: "series",
          fade: "global",
        },
      },
    ];
  
    res.status(200).json(series);
}
