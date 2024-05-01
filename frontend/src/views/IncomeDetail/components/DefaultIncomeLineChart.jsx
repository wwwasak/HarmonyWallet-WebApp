import { Box } from "@chakra-ui/react";
import LineChartComponent from '../../../modules/charts/LineChartComponent';

export default function DefaultIncomeLineChart({ xAxisData, yAxisLabel, seriesData}) {
  const dataRange = {
    title: 'Expense Records in Recent One Week',
    xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    yAxisLabel: '{value} $',
    highlightedZone: [
        { start: 1, end: 3 },
        { start: 5, end: 6 }
    ],
    seriesData: [10, 11, 13, 11, 12, 12, 9]
};

return (
    <Box>
        <LineChartComponent {...dataRange} />
    </Box>
);
}
