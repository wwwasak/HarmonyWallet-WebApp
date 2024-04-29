import {
  Card,
  Grid,
  Text,
} from "@chakra-ui/react";

import ProfileCard from "./components/ProfileCard";
import IncomeLineChartCard from "./components/IncomeLineChartCard";
import ExpenseLineChartCard from "./components/ExpenseLineChartCard";
import RecentRecordsCard from "./components/RecentRecordsCard";
import FloatWindow from "./components/FloatWindow";

const data = [
  { Date: "17/04/2024", currency: 2400, amt: 2400 },
  { Date: "16/04/2024", currency: 1398, amt: 2210 },
  { Date: "15/04/2024", currency: 9800, amt: 2290 },
  { Date: "14/04/2024", currency: 3908, amt: 2000 },
  { Date: "13/04/2024", currency: 4800, amt: 2181 },
  { Date: "12/04/2024", currency: 3800, amt: 2500 },
  { Date: "11/04/2024", currency: 4300, amt: 2100 },
];

// gridArea arguments: row-start/column-start/row-end/column-end
const RecordingPage = () => {
  const preferredCurrency = "NZD";
  return (
    <Card>
      <Grid templateColumns="1fr 3fr" gap={6}>
        <ProfileCard
          gridArea="1 / 1 / 2 / 2"
          preferredCurrency={preferredCurrency}
        />
        <IncomeLineChartCard gridArea="1 / 2 / 1 / 4" data={data}>
          <Text>Line Chart Data</Text>
        </IncomeLineChartCard>
        <ExpenseLineChartCard gridArea="2 / 2 / 2 / 4" data={data}>
          <Text>More Data Here</Text>
        </ExpenseLineChartCard>
        <RecentRecordsCard gridArea="2 / 1 / 2 / 2">
          <Text>Additional Info</Text>
        </RecentRecordsCard>
      </Grid>
      <FloatWindow />
    </Card>
  );
};

export default RecordingPage;
