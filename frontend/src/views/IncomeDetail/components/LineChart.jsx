import { Box } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import React, { useState, useEffect, useCallback } from "react";

export default function LineChart({ xAxis, seriesData, currency }) {
  const dataPeriod = xAxis;
  // console.log(xAxis);
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
      bg="green.200"
      borderRadius="16px"
      height="400px"
      minW="50%"
      alignContent="center"
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
