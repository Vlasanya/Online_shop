import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { BarChart } from "@mui/x-charts/BarChart";
import ChartWrapper from "./ChartWrapper";
import type { HighlightScope } from "@mui/x-charts";

interface SeriesData {
  label: string;
  data: number[];
  highlightScope?: Partial<HighlightScope>;
}

const BarChartWithAPI: React.FC = () => {
  const [series, setSeries] = useState<SeriesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [seriesNb, setSeriesNb] = useState(2);
  const [itemNb, setItemNb] = useState(5);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    fetch("/api/bar-chart-data")
      .then((response) => response.json())
      .then((data) => {
        setSeries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bar chart data:", error);
        setLoading(false);
      });
  }, []);

  const handleItemNbChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setItemNb(newValue);
    }
  };

  const handleSeriesNbChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setSeriesNb(newValue);
    }
  };

  if (loading) {
    return <div>Loading Bar Chart...</div>;
  }

  return (
    <ChartWrapper title="Bar Chart with API">
      <Box sx={{ width: "100%" }}>
        <BarChart
          height={300}
          series={series
            .slice(0, seriesNb)
            .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
          skipAnimation={skipAnimation}
        />
        <FormControlLabel
          checked={skipAnimation}
          control={
            <Checkbox
              onChange={(event) => setSkipAnimation(event.target.checked)}
            />
          }
          label="skipAnimation"
          labelPlacement="end"
        />
        <Typography id="input-item-number" gutterBottom>
          Number of items
        </Typography>
        <Slider
          value={itemNb}
          onChange={handleItemNbChange}
          valueLabelDisplay="auto"
          min={1}
          max={20}
          aria-labelledby="input-item-number"
        />
        <Typography id="input-series-number" gutterBottom>
          Number of series
        </Typography>
        <Slider
          value={seriesNb}
          onChange={handleSeriesNbChange}
          valueLabelDisplay="auto"
          min={1}
          max={10}
          aria-labelledby="input-series-number"
        />
      </Box>
    </ChartWrapper>
  );
};

export default BarChartWithAPI;
