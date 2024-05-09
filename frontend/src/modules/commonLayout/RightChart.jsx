import { Box } from "@chakra-ui/react";
import Chart from "react-apexcharts";

export default function RightChart({ chartData }) {
  const labelAmountMap = {};
  const showedLabelMap = {};
  chartData.forEach((dataItem) => {
    const label = dataItem.currency.currency;
    const amount = dataItem.convertedAmount;
    const realAmount = dataItem.amount;
    if (labelAmountMap[label]) {
      labelAmountMap[label] += amount;
    } else {
      labelAmountMap[label] = amount;
    }
    if (showedLabelMap[label]) {
      showedLabelMap[label] += realAmount;
    } else {
      showedLabelMap[label] = realAmount;
    }
  });

  const labels = Object.keys(labelAmountMap);
  const series = Object.values(labelAmountMap);

  const showedAmount = Object.values(showedLabelMap);

  const options = {
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
    legend: false,
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    tooltip: {
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        const label = w.globals.labels[seriesIndex];
        const amount = showedAmount[seriesIndex];
        return label + ": " + amount.toFixed(2);
      },
    },
  };

  return (
    <Box
      m={10}
      // bg="green.200"
      borderRadius="16px"
      height="400px"
      alignContent="center"
      border="1px"
      borderColor="gray.300"
      borderWidth="2px"
      borderStyle="dashed"
    >
      <Chart
        options={options}
        series={series}
        type="pie"
        height={300}
        width={400}
      />
    </Box>
  );
}
