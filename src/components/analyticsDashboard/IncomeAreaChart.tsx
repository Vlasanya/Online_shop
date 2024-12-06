import { useTheme } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApexOptions } from "apexcharts";

interface IncomeAreaChartProps {
  slot: "week" | "month";
}

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const IncomeAreaChart: React.FC<IncomeAreaChartProps> = ({ slot }) => {
  const theme = useTheme();
  const { secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState<ApexOptions | null>(null);
  const [series, setSeries] = useState<Array<{ name: string; data: number[] }> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const originalAddEventListener = EventTarget.prototype.addEventListener;

    EventTarget.prototype.addEventListener = function (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) {
      if (type === "touchstart" && options === undefined) {
        options = { passive: true };
      }
      return originalAddEventListener.call(this, type, listener, options);
    };

    return () => {
      EventTarget.prototype.addEventListener = originalAddEventListener;
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    setSeries(null);
    setOptions(null);

    axios
      .get(`/api/unique-visitor`, { params: { slot } })
      .then((response) => {
        const data = response.data;

        if (
          !data.categories ||
          !Array.isArray(data.categories) ||
          !data.series ||
          !Array.isArray(data.series)
        ) {
          throw new Error("Invalid data format from API");
        }

        const isValidSeries = data.series.every(
          (s: { name: string; data: number[] }) =>
            s.name && Array.isArray(s.data) && s.data.every((val) => typeof val === "number")
        );

        if (!isValidSeries) {
          throw new Error("Invalid series data");
        }

        setOptions({
          chart: {
            height: 450,
            type: "area",
            toolbar: { show: false },
            animations: { enabled: true },
            events: {
              mounted: () => {
                document.querySelectorAll(".apexcharts").forEach((chartElement) => {
                  chartElement.addEventListener("touchstart", () => {}, { passive: true });
                });
              },
            },
          },
          dataLabels: { enabled: false },
          stroke: { curve: "smooth", width: 2 },
          grid: { strokeDashArray: 0, borderColor: line },
          colors: [theme.palette.primary.main, theme.palette.secondary.main],
          xaxis: {
            categories: data.categories,
            labels: {
              style: {
                colors: Array(data.categories.length).fill(secondary),
              },
            },
            tickAmount: slot === "month" ? 11 : 7,
          },
          yaxis: {
            labels: { style: { colors: [secondary] } },
          },
        });

        setSeries(data.series);
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slot, secondary, theme.palette.primary.main, theme.palette.secondary.main, line]);

  if (loading || !options || !series) {
    return <div>Loading...</div>;
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={450}
    />
  );
};

export default IncomeAreaChart;
