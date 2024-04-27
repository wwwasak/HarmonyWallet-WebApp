import { LineChart, Line, Tooltip, YAxis, ResponsiveContainer } from "recharts";
const WeeklyLineChart = ({ data, currency }) => {
  const currencyData = data.map((item) => ({
    date: item.date,
    rate: item.data.rates[currency],
  }));
  console.log(currencyData);

  return (
    <ResponsiveContainer width="95%" height={200}>
      <LineChart data={currencyData}>
        <Tooltip />
        <Line type="monotone" dataKey="rate" stroke="#8884d8" />
        <YAxis type="number" domain={["auto", "auto"]} hide />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeeklyLineChart;
