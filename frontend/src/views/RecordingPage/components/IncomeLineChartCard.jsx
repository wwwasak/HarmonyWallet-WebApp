import {
  Card,
  CardHeader,
  CardBody,
  Grid,
  Text,
  Heading,
  Button,
  Flex,
  Divider,
  Avatar,
  Box,
  IconButton,
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

const IncomeLineChartCard = ({ gridArea, data }) => {
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

export default IncomeLineChartCard;
