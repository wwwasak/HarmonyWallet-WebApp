import {
  Card,
  CardHeader,
  CardBody,
  Grid,
  Text,
  Heading,
  Flex,
  Divider,
  Box,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ProfileCard from "./components/ProfileCard";
// import IncomeLineChartCard from "./components/IncomeLineChartCard";
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

const IncomeLineChartCard = ({ gridArea }) => {
  return (
    <Card gridArea={gridArea}>
      <CardHeader>
        <Flex justifyContent="center" alignItems="center">
          <Heading size="sm" textTransform="uppercase">
            Income
          </Heading>
        </Flex>
        <Divider my={2} />
      </CardHeader>
      <CardBody>
        <Box p={4} boxShadow="base" rounded="md" bg="white" width="100%">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="Date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="currency" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardBody>
    </Card>
  );
};

const ExpenseLineChartCard = ({ gridArea }) => {
  return (
    <Card gridArea={gridArea}>
      <CardHeader>
        <Flex justifyContent="center" alignItems="center">
          <Heading size="sm" textTransform="uppercase">
            Expense
          </Heading>
        </Flex>
        <Divider my={2} />
      </CardHeader>
      <CardBody>
        <Box p={4} boxShadow="base" rounded="md" bg="white" width="100%">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="Date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="currency" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardBody>
    </Card>
  );
};

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
        <IncomeLineChartCard gridArea="1 / 2 / 1 / 4">
          <Text>Line Chart Data</Text>
        </IncomeLineChartCard>
        <ExpenseLineChartCard gridArea="2 / 2 / 2 / 4">
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
