import { Tbody, Td, Text, Tr } from "@chakra-ui/react"; //Table Imports
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
                    {item?.return_invoiced_timestamp?.split("T")[0] +
                      "  " +
                      item?.return_invoiced_timestamp
                        ?.split("T")[1]
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
