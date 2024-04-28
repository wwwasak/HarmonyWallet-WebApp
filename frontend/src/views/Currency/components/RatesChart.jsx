import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
const RatesChart = ({ data, currency }) => {
  if (!data || !data.rates) {
    return null;
  }

  const currencyData = Object.keys(data.rates).map((date) => ({
    date: date,
    rate: data.rates[date][currency],
  }));

  return (
    <ResponsiveContainer width="95%" height={200}>
      <LineChart data={currencyData}>
        <XAxis dataKey="date" hide />
        <Tooltip />
        <Line type="monotone" dataKey="rate" stroke="#8884d8" />
        <YAxis type="number" domain={["auto", "auto"]} hide />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RatesChart;
