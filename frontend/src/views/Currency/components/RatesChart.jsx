import ReactApexChart from "react-apexcharts";

const RatesChart = ({ data, currency }) => {
  if (!data || !data.rates) {
    return null;
  }

  const categories = Object.keys(data.rates).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const series = [
    {
      name: currency,
      data: categories.map((date) => data.rates[date][currency]),
    },
  ];

  const options = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories,
      show: false,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
    stroke: {
      width: 1.5,
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={200}
    />
  );
};

export default RatesChart;
