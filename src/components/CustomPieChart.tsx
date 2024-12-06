import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import ChartWrapper from "./ChartWrapper";
import { Box, useMediaQuery, useTheme } from "@mui/material";

interface PieChartData {
  id: string;
  label: string;
  value: number;
}

const CustomPieChart: React.FC = () => {
  const [data, setData] = useState<PieChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/pie-chart-data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching pie chart data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  if (loading) {
    return <div>Loading Pie Chart...</div>;
  }

  return (
    <ChartWrapper title="Custom Pie Chart">
      <Box
        sx={{
          minHeight: "560px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <PieChart
          series={[
            {
              data,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              valueFormatter: (value) => {
                if (
                  typeof value === "object" &&
                  value !== null &&
                  "value" in value
                ) {
                  return `${value.value}%`;
                }
                return "";
              },
            },
          ]}
          height={isSmallScreen ? 300 : 200} 
          sx={{ minWidth: isSmallScreen ? 300 : 350 }}
        />
      </Box>
    </ChartWrapper>
  );
};

export default CustomPieChart;
