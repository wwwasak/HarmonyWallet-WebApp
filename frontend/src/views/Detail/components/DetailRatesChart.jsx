import {
  CartesianGrid,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
const DetailRatesChart = ({ data, currency }) => {
  if (!data || !data.rates) {
    return null;
  }

  const currencyData = Object.keys(data.rates).map((date) => ({
    date: date,
    rate: data.rates[date][currency],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={currencyData}>
        <XAxis dataKey="date" />
        <YAxis type="number" domain={["auto", "auto"]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Line type="monotone" dataKey="rate" stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DetailRatesChart;
