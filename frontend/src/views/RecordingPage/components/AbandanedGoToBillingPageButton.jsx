import { IconButton } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const GoToBillingPageButton = () => {
  return (
    <Link to="/billing">
      <IconButton
        icon={<FaPlus style={{ fontSize: "50px" }} />}
        boxSize={{ base: "32px", md: "50px", lg: "70px" }}
        isRound={true}
        colorScheme="blue"
        position="fixed"
        bottom="16px"
        right="16px"
        aria-label="Go to billing page" // Accessibility design
      />
    </Link>
  );
};

export default GoToBillingPageButton;
