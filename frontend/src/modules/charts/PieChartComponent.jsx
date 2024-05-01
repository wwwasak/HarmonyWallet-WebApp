import { Text, Box } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import React from "react";

export default function PieChart({ datePeriod, series }) {
  //const dateLastQuotes = ["23/Apr", "24/Apr", "25/Apr", "26/Apr", "26/Apr"];
  //const series = [500, 600, 100, 500, 1000];
  var options = {
    labels: datePeriod,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <Box m={10} bg="green.200" borderRadius="16px" height="400px" width="50%">
      <Text>PieChart</Text>
      <Chart
        options={options}
        series={series}
        type="pie"
        height={300}
        width={600}
      />
    </Box>
  );
}
