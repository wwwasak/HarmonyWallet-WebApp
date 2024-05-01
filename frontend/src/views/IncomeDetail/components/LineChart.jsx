import { Box } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import React, { useState, useEffect, useCallback } from "react";

export default function LineChart({ datePeriod, currency }) {
  const dataPeriod = ["23/Apr", "24/Apr", "25/Apr", "26/Apr", "26/Apr"];
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
      data: [500, 600, 100, 500, 1000],
    },
  ];
  return (
    <Box m={10} bg="green.200" borderRadius="16px" height="400px" width="50%">
      LineChart
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
