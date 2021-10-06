import {
  Tbody,
  Td,
  Text,
  Tr,
  useToast,
  Badge,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalContent,
  ModalHeader,
  Button,
  Flex,
  Table,
  Divider,
} from "@chakra-ui/react"; //Table Imports
import { useState } from "react";
import {
  OrderItemsTableHead,
  ReturnsTableHead,
} from "../components/TableHeads";
import ReturnItemsTable from "../containers/ReturnItemsTable";
import { SalesListSkeleton } from "../components/TableSkeletons";
import { getJson, postretryFailed } from "../api";
import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";
import CarOrderItems from "./CarOrderItemsTable";
import ReservationStatus from "../utils/reservationStatus";
dayjs.extend(UTC);
// import MapsLink from "../components/MapsLink";
// import ItemsTotal from "./ItemsTotal";
// import OrderDetails from "./OrderDetails";

const SalesOrderTable = ({ emptyLoading, data, setreload }) => {
  const toast = useToast();
  const [JsonContent, setJsonContent] = useState("Loading please wait");
  const [isOpen, setisOpen] = useState(false);
  // const [isopenOrderItems, setisopenOrderItems] = useState(false);
  // const [isopenReturns, setisopenReturns] = useState(false);
  // const [OrderItems, setOrderItems] = useState();
  const retryFailed = async (type, id) => {
    let payload = {
      type: type,
    };
    const response = await postretryFailed(payload, id);
    if (response?.success === true) {
      setreload((reload) => !reload);
    }
    toast({
      // title: "Failed to generate report",
      description: response?.message ?? "Something went wrong",
      status: response?.success === true ? "success" : "error",
      duration: 2500,
      isClosable: true,
    });
  };
  const viewJson = async (type, id) => {
    try {
      const response = await getJson(type, id);
      if (response) {
        setJsonContent({
          type: type,
          request: response.data[0].request,
          response: response.data[0].response,
          request_timestamp: response.data[0].request_timestamp,
          response_timestamp: response.data[0].response_timestamp,
        });
        setisOpen(true);
      }
    } catch (e) {
      toast({
        // title: "Failed to generate report",
        description: e?.message ?? "Something went wrong",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
  };
  const onClose = () => {
    setisOpen(false);
    // setisopenOrderItems(false);
    // setisopenReturns(false);
  };
  return (
    <>
      {emptyLoading && <SalesListSkeleton />}
      {!emptyLoading && data && (
        <Tbody>
          {data.map((item, index) => {
            return (
              <Tr key={`${index}`}>
                <Td minWidth={100}>
                  <Text>{item?.id}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.car_order?.increment_id ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.car_order?.magento_order_id ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.carOrderId ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.car_order?.customer_id ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.sales_invoiced ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>
                    {item?.sales_invoiced_timestamp?.split("T")[0] +
                      "  " +
                      item?.sales_invoiced_timestamp
                        ?.split("T")[1]
                        .split(".")[0] ?? "-"}
                  </Text>
                </Td>
                <Td minWidth={100}>
                  <Text>
                    {ReservationStatus(item?.car_order?.reservation_status)}
                  </Text>
                  {/* <Text>{item?.car_order?.reservation_status ?? "-"}</Text> */}
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.car_order?.grand_total ?? "-"}</Text>
                </Td>

                <Td minWidth={100}>
                  <Badge
                    cursor="pointer"
                    colorScheme="purple"
                    onClick={() => viewJson("sale", item?.id)}
                  >
                    View
                  </Badge>
                </Td>
                <Td minWidth={100}>
                  {item?.sales_invoice_failed ? (
                    <Badge
                      cursor="pointer"
                      colorScheme="green"
                      onClick={() =>
                        retryFailed("sale", item?.car_order?.magento_order_id)
                      }
                    >
                      Retry
                    </Badge>
                  ) : (
                    <Text>-</Text>
                  )}
                </Td>
              </Tr>
            );
          })}
          <Modal
            size="xl"
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="inside"
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textTransform="capitalize">
                {JsonContent.type}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  {" "}
                  <Flex fontSize="20px">
                    Request&nbsp;
                    <Flex color="red">
                      {`[${
                        JsonContent?.request_timestamp?.split("T")[0] +
                          "  " +
                          JsonContent?.request_timestamp
                            ?.split("T")[1]
                            .split(".")[0] ?? "-"
                      }]`}{" "}
                    </Flex>
                  </Flex>
                  {JsonContent.request}
                </Text>
                <Divider margin="20px 0px" />
                <Text>
                  {" "}
                  <Flex fontSize="20px">
                    Response&nbsp;
                    <Flex color="red">
                      {`[${
                        JsonContent?.response_timestamp?.split("T")[0] +
                          "  " +
                          JsonContent?.response_timestamp
                            ?.split("T")[1]
                            .split(".")[0] ?? "-"
                      }]`}{" "}
                    </Flex>
                  </Flex>
                  {JsonContent.response}
                </Text>
              </ModalBody>
            </ModalContent>
          </Modal>
          {/* <Modal
            isOpen={isopenReturns}
            onClose={onClose}
            scrollBehavior="inside"
            isCentered
            size="full"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textTransform="capitalize">Returns</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Table variant="simple" size="sm">
                  <ReturnsTableHead />
                  <ReturnItemsTable data={OrderItems?.returns ?? []} />
                </Table>
              </ModalBody>
            </ModalContent>
          </Modal> */}
          {/* <Modal
            isOpen={isopenOrderItems}
            onClose={onClose}
            scrollBehavior="inside"
            isCentered
            size="full"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textTransform="capitalize">
                Car Order Items
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Table variant="simple" size="sm">
                  <OrderItemsTableHead />
                  <CarOrderItems data={OrderItems?.car_order_items ?? []} />
                </Table>
              </ModalBody>
            </ModalContent>
          </Modal> */}
        </Tbody>
      )}
    </>
  );
};

export default SalesOrderTable;
