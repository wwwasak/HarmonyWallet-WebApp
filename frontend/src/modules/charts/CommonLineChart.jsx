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
      enabled: true,
    },
    xaxis: {
      categories: dataPeriod,
      labels: {
        rotate: 0,
      },
      tooltip: {
        enabled: false,
      },
      tickAmount: 6,
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
    },
    stroke: {
      curve: "straight",
    },
    dataLabels: {
      enabled: false,
    },
  };
  const series = [
    {
      name: "Income",
      data: seriesData,
    },
  ];
  return (
    <Box
      m={10}
      borderRadius="16px"
      height="400px"
      minW="200px"
      alignContent="center"
      justifyContent="center"
      border="1px"
      borderColor="gray.300"
      borderWidth="2px"
      borderStyle="dashed"
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
