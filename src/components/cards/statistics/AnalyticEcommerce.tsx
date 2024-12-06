import React from "react";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MainCard from "../../analyticsDashboard/MainCard";
import RiseOutlined from "@ant-design/icons/RiseOutlined";
import FallOutlined from "@ant-design/icons/FallOutlined";
import ChartWrapper from "../../analyticsDashboard/ChartWrapper";

interface AnalyticEcommerceProps {
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  title: string;
  count: string;
  percentage?: number;
  isLoss?: boolean;
  extra: string;
}

const iconSX = {
  fontSize: "0.75rem",
  color: "inherit",
  marginLeft: 0,
  marginRight: 0,
};

const AnalyticEcommerce: React.FC<AnalyticEcommerceProps> = ({
  color = "primary",
  title,
  count,
  percentage,
  isLoss,
  extra,
}) => {
  const chipColor = isLoss ? "warning" : "info";
  return (
    <ChartWrapper>
      <MainCard contentSX={{ p: 2.25 }}>
        <Stack spacing={0.5}>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
          <Grid container alignItems="center" spacing={2}>
            <Grid>
              <Typography variant="h4" color="inherit">
                {count}
              </Typography>
            </Grid>
            {percentage !== undefined && (
              <Grid>
                <Chip
                  variant="outlined"
                  color={chipColor}
                  icon={
                    isLoss ? (
                      <FallOutlined style={iconSX} />
                    ) : (
                      <RiseOutlined style={iconSX} />
                    )
                  }
                  label={`${percentage}%`}
                  sx={{ ml: 1.25, pl: 1, borderRadius: "4px" }}
                  size="small"
                />
              </Grid>
            )}
          </Grid>
        </Stack>
        <Box sx={{ pt: 2.25 }}>
          <Typography variant="caption" color="text.secondary">
            You made an extra{" "}
            <Typography variant="caption" sx={{ color: `${color}.main` }}>
              {extra}
            </Typography>{" "}
            this year
          </Typography>
        </Box>
      </MainCard>
    </ChartWrapper>
  );
};

export default AnalyticEcommerce;
