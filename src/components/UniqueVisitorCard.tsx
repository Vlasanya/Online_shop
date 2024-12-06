import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import MainCard from "./MainCard";
import IncomeAreaChart from "./IncomeAreaChart";
import ChartWrapper from "./ChartWrapper";

const UniqueVisitorCard: React.FC = () => {
  const [slot, setSlot] = useState<"week" | "month">("week");

  return (
    <ChartWrapper title="Unique Visitor">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              size="small"
              onClick={() => setSlot("month")}
              color={slot === "month" ? "primary" : "secondary"}
              variant={slot === "month" ? "outlined" : "text"}
            >
              Month
            </Button>
            <Button
              size="small"
              onClick={() => setSlot("week")}
              color={slot === "week" ? "primary" : "secondary"}
              variant={slot === "week" ? "outlined" : "text"}
            >
              Week
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <IncomeAreaChart slot={slot} />
        </Box>
      </MainCard>
    </ChartWrapper>
  );
};

export default UniqueVisitorCard;
