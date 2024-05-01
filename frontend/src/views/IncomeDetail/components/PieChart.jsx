import { Text, Box } from "@chakra-ui/react";
import Chart from "react-apexcharts";

import React, { useState, useEffect, useCallback } from "react";

export default function PieChart({ datePeriod, currency }) {
  const dataPeriod = ["23/Apr", "24/Apr", "25/Apr", "26/Apr", "26/Apr"];
  var options = {
    labels: dataPeriod,
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
  const series = [500, 600, 100, 500, 1000];

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
