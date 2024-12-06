import React, { useState, useEffect } from "react";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { Stack, TextField, MenuItem } from "@mui/material";
import ChartWrapper from "./ChartWrapper";

interface ScatterData {
  x: number;
  y: number;
  z: number;
  id: string;
}

const CustomScatterChart: React.FC = () => {
  const [data, setData] = useState<ScatterData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [colorX, setColorX] = useState<"None" | "piecewise" | "continuous">(
    "piecewise"
  );
  const [colorY, setColorY] = useState<"None" | "piecewise" | "continuous">(
    "None"
  );
  const [colorZ, setColorZ] = useState<
    "None" | "piecewise" | "continuous" | "ordinal"
  >("None");

  useEffect(() => {
    setLoading(true);
    fetch("/api/scatter-chart-data")
      .then((response) => response.json())
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) =>
        console.error("Error fetching scatter chart data:", error)
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading Scatter Chart...</div>;
  }

  return (
    <ChartWrapper title="Scatter Chart">
      <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
        <Stack direction="row" spacing={1}>
          <TextField
            select
            sx={{ minWidth: 150 }}
            label="X-Axis Color Map"
            value={colorX}
            onChange={(event) =>
              setColorX(
                event.target.value as "None" | "piecewise" | "continuous"
              )
            }
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="piecewise">Piecewise</MenuItem>
            <MenuItem value="continuous">Continuous</MenuItem>
          </TextField>
          <TextField
            select
            sx={{ minWidth: 150 }}
            label="Y-Axis Color Map"
            value={colorY}
            onChange={(event) =>
              setColorY(
                event.target.value as "None" | "piecewise" | "continuous"
              )
            }
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="piecewise">Piecewise</MenuItem>
            <MenuItem value="continuous">Continuous</MenuItem>
          </TextField>
          <TextField
            select
            sx={{ minWidth: 150 }}
            label="Z-Axis Color Map"
            value={colorZ}
            onChange={(event) =>
              setColorZ(
                event.target.value as
                  | "None"
                  | "piecewise"
                  | "continuous"
                  | "ordinal"
              )
            }
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="piecewise">Piecewise</MenuItem>
            <MenuItem value="continuous">Continuous</MenuItem>
            <MenuItem value="ordinal">Ordinal</MenuItem>
          </TextField>
        </Stack>
        <ScatterChart
          height={500}
          grid={{ horizontal: true, vertical: true }}
          series={[
            {
              data,
              valueFormatter: (v) => `(${v.x?.toFixed(2)}, ${v.y?.toFixed(2)})`,
            },
          ]}
          xAxis={[
            {
              min: -3,
              max: 3,
              tickInterval: [-3, -1.5, 0, 1.5, 3],
              colorMap:
                (colorX === "continuous" && {
                  type: "continuous",
                  min: -2,
                  max: 2,
                  color: ["green", "orange"],
                }) ||
                (colorX === "piecewise" && {
                  type: "piecewise",
                  thresholds: [-1.5, 0, 1.5],
                  colors: ["#d01c8b", "#f1b6da", "#b8e186", "#4dac26"],
                }) ||
                undefined,
            },
          ]}
          yAxis={[
            {
              min: -3,
              max: 3,
              tickInterval: [-3, -1.5, 0, 1.5, 3],
              colorMap:
                (colorY === "continuous" && {
                  type: "continuous",
                  min: -2,
                  max: 2,
                  color: ["blue", "red"],
                }) ||
                (colorY === "piecewise" && {
                  type: "piecewise",
                  thresholds: [-1.5, 0, 1.5],
                  colors: ["lightblue", "blue", "orange", "red"],
                }) ||
                undefined,
            },
          ]}
          zAxis={[
            {
              data:
                colorZ === "ordinal"
                  ? [
                      ...[...Array(data.length / 4)].map(() => "A"),
                      ...[...Array(data.length / 4)].map(() => "B"),
                      ...[...Array(data.length / 4)].map(() => "C"),
                      ...[...Array(data.length / 4)].map(() => "D"),
                    ]
                  : undefined,
              colorMap:
                (colorZ === "continuous" && {
                  type: "continuous",
                  min: -2,
                  max: 2,
                  color: ["green", "orange"],
                }) ||
                (colorZ === "piecewise" && {
                  type: "piecewise",
                  thresholds: [-1.5, 0, 1.5],
                  colors: ["#d01c8b", "#f1b6da", "#b8e186", "#4dac26"],
                }) ||
                (colorZ === "ordinal" && {
                  type: "ordinal",
                  values: ["A", "B", "C", "D"],
                  colors: ["#d01c8b", "#f1b6da", "#b8e186", "#4dac26"],
                }) ||
                undefined,
            },
          ]}
        />
      </Stack>
    </ChartWrapper>
  );
};

export default CustomScatterChart;
