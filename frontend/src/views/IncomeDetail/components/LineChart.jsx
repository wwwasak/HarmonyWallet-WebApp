import { Box } from "@chakra-ui/react";
import Chart from "react-apexcharts";

export default function LineChart({ xAxis, seriesData }) {
  const dataPeriod = xAxis;
  var options = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: `var(--text-body)`,
      type: "area",
    },
    tooltip: {
      enabled: false,
    },
    grid: {
      show: true,
    },
    xaxis: {
      categories: dataPeriod,
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(0); // Converts the y-axis values to integers
        },
      },
    },
  };
  const series = [
    {
      data: seriesData,
    },
  ];
  return (
    <Box
      m={10}
      bg="green.100"
      borderRadius="16px"
      height="400px"
      minW="200px"
      alignContent="center"
      justifyContent="center"
    >
      <Chart
        options={options}
        series={series}
        type="area"
        height={300}
        width={600}
      />
    </Box>
  );
}
