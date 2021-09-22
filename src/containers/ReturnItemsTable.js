import { Tbody, Td, Text, Tr, useToast, Badge } from "@chakra-ui/react"; //Table Imports
import { useState } from "react";
import { OrderListSkeleton } from "../components/TableSkeletons";
import { getJson, postretryFailed } from "../api";
import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";
dayjs.extend(UTC);
// import MapsLink from "../components/MapsLink";
// import ItemsTotal from "./ItemsTotal";
// import OrderDetails from "./OrderDetails";

const ReturnItemsTable = ({ data }) => {
  return (
    <>
      {data && (
        <Tbody>
          {data.map((item, index) => {
            return (
              <Tr key={`${index}`}>
                <Td minWidth={100}>
                  <Text>{item?.id ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.carOrderId ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.return_invoiced ? "true" : "false"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>
                    {item?.return_invoiced_timestamp.split("T")[0] +
                      "  " +
                      item?.return_invoiced_timestamp
                        .split("T")[1]
                        .split(".")[0] ?? "-"}
                  </Text>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      )}
    </>
  );
};

export default ReturnItemsTable;
