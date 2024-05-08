import ReactApexChart from "react-apexcharts";
import { useCurrency } from "../../../stores/BaseCurrencyContext";
import useRates from "../../../hooks/useRates.jsx";
import { subDays, format } from "date-fns";

const RatesChart = ({ currency }) => {
  const { baseCurrency } = useCurrency();
  const oneWeekAgo = format(subDays(new Date(), 6), "yyyy-MM-dd");
  const { data, isLoading, error } = useRates(baseCurrency, oneWeekAgo);

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data || !data.rates || Object.keys(data.rates).length === 0) {
    return <div>No data available</div>;
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
      categories: categories,
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
    data &&
    data.rates &&
    baseCurrency !== currency && (
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={200}
      />
    )
  );
};

export default RatesChart;
