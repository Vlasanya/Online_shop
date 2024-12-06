import React, { useEffect, useState } from "react";
import axios from "axios";
import AnalyticEcommerce from "./cards/statistics/AnalyticEcommerce";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UniqueVisitorCard from "./UniqueVisitorCard";
import CustomPieChart from "./CustomPieChart";
import CustomScatterChart from "./CustomScatterChart";
import BarChartWithAPI from "./BarChartWithAPI";
import OrderTable from "./OrdersTable";
import { styled } from "@mui/system";

interface AnalyticData {
  id: number;
  title: string;
  count: string;
  percentage: number;
  isLoss: boolean;
  extra: string;
}

const CustomMediaBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  width: "100%",
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "1fr 2fr",
  },
}));

const AnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get<AnalyticData[]>("/api/analytic-data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching analytic data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Typography variant="h2">Analytics Dashboard</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 0,
        }}
      >
        {data.map((item) => (
          <AnalyticEcommerce
            key={item.id}
            title={item.title}
            count={item.count}
            percentage={item.percentage}
            isLoss={item.isLoss}
            extra={item.extra}
          />
        ))}
      </Box>
      <Box>
        <UniqueVisitorCard />
      </Box>
      <CustomMediaBox>
        <CustomPieChart />
        <CustomScatterChart />
      </CustomMediaBox>
      <Box>
        <BarChartWithAPI />
      </Box>
      <Box>
        <OrderTable />
      </Box>
    </Box>
  );
};

export default AnalyticsDashboard;
