import { Flex, Box, Text, Button, Select, Icon } from "@chakra-ui/react";
import { FcDocument } from "react-icons/fc";
import { useState } from "react";

const Title = ({ sites, getSelectedID, reportName, selectID, url }) => {
  const [selectedSite, setSelectedSite] = useState(
    selectID === "website_id" ? 8042 : 1
  );
  const viewReport = () => {
    getSelectedID(url, selectID, selectedSite);
  };
  return (
    <Box
      width="100%"
      borderWidth="1px"
      borderRadius="lg"
      padding="10px"
      margin="10px 0px"
      overflow="hidden"
    >
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Icon as={FcDocument} w={8} h={8} />
          <Text>{reportName}</Text>
        </Flex>
        <Flex alignItems="center">
          <Select
            variant="filled"
            placeholder={sites?.length ? "Select site" : "No sites found"}
            defaultValue={selectedSite}
            value={selectedSite}
            onChange={(e) => {
              setSelectedSite(e?.target?.value);
            }}
            size="sm"
            width="150px"
            borderRadius="5px"
            mr="20px"
            my="10px"
          >
            {sites?.length
              ? sites?.map((site) => (
                  <option
                    value={
                      selectID === "website_id"
                        ? site.sap_website_id
                        : site.website_id
                    }
                    key={
                      selectID === "website_id"
                        ? site.sap_website_id
                        : site.website_id
                    }
                  >
                    Site:&nbsp;{site?.sap_website_id}
                  </option>
                ))
              : null}
          </Select>
          <Button onClick={viewReport}>View</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Title;
