import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Flex, Box, Text } from "@chakra-ui/react";

import Title from "../components/Titles";

import { getStores } from "../api";

const Home = () => {
  const [sites, setSites] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const loadSites = async () => {
      try {
        const sites = await getStores();
        if (sites) {
          setSites(Object.values(sites));
        }
      } catch (e) {
        console.log(e);
        setSites([]);
      }
    };

    loadSites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const viewReport = (url, selectID, id) => {
    history.push(`${url}?id=${id}`);
  };

  return (
    <Flex
      height="calc(100vh - 120x)"
      justify="center"
      align="center"
      direction="column"
      paddingTop="5%"
    >
      <Box
        width="90%"
        borderWidth="1px"
        borderRadius="lg"
        padding="20px"
        overflow="hidden"
      >
        <Text textColor="red" fontSize="20px" fontWeight="bold">
          Tables
        </Text>
        <Box width="100%" height="0%" borderWidth="1px" bg={"gray.400"}></Box>
        <Title
          getSelectedID={viewReport}
          sites={sites}
          reportName={"SALES"}
          selectID={"website_id"}
          url={"/sales"}
        />
        <Title
          getSelectedID={viewReport}
          sites={sites}
          reportName={"RESERVATION"}
          selectID={"website_id"}
          url={"/reservation"}
        />
        <Title
          getSelectedID={viewReport}
          sites={sites}
          reportName={"RETURNS"}
          selectID={"website_id"}
          url={"/returns"}
        />
      </Box>
    </Flex>
  );
};

export default Home;
