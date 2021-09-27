import { Tbody, Td, Text, Tr } from "@chakra-ui/react"; //Table Imports

const CarOrderItems = ({ data }) => {
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
                  <Text>{item?.item_id ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.carOrderId ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.article_number ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.quantity ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.quantity_returned ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.unit_of_measurement ? "true" : "false"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.price ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.tax ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.tax_code ?? "-"}</Text>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      )}
    </>
  );
};

export default CarOrderItems;
