import { Text } from "@chakra-ui/react";
import React from "react";
import useLocalTimes from "../../../hooks/useLocalTimes";

const LocalTime = ({ currency }) => {
  const { data, error } = useLocalTimes(currency);
  const timeString = data?.datetime;

  if (!timeString) {
    return null;
  }

  const timeStringWithoutMilliseconds = timeString.split(".")[0];
  const dateObject = new Date(timeStringWithoutMilliseconds);

  const formattedDate = dateObject.toISOString().split("T")[0];
  const formattedTime = `${dateObject
    .getHours()
    .toString()
    .padStart(2, "0")}:${dateObject.getMinutes().toString().padStart(2, "0")}`;

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <Text fontSize="xs" fontStyle="italic">
      Local Time: {formattedDate}, {formattedTime}
    </Text>
  );
};

export default LocalTime;
