import {
  Box,
  Button,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { CURRENCIES } from "../../../data/CURRENCIES.js";
import { useState } from "react";

const IncomeSelector = ({ selected, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const filteredCurrencies = CURRENCIES.filter((currency) =>
    currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedCurrency || "Select"}
      </MenuButton>
      <MenuList maxH="250px" overflowY="auto">
        <Box margin={2}>
          <Input
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        {filteredCurrencies.map((currency, index) => (
          <MenuItem
            onClick={() => {
              setSelectedCurrency(currency);
              onSelect(currency);
            }}
            key={index}
          >
            <Image
              src={`${currency}.png`}
              marginRight="8px"
              width="30px"
              height="auto"
            />
            {currency}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default IncomeSelector;
