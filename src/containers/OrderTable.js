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
  Divider,
} from "@chakra-ui/react"; //Table Imports
import { useState } from "react";
import { OrderListSkeleton } from "../components/TableSkeletons";
import { getJson, postretryFailed } from "../api";
import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";
dayjs.extend(UTC);
// import MapsLink from "../components/MapsLink";
// import ItemsTotal from "./ItemsTotal";
// import OrderDetails from "./OrderDetails";

const SalesSummaryTable = ({ emptyLoading, data, setreload }) => {
  const toast = useToast();
  const [JsonContent, setJsonContent] = useState("Loading please wait");
  const [isOpen, setisOpen] = useState(false);
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
  };
  return (
    <>
      {emptyLoading && <OrderListSkeleton />}
      {!emptyLoading && data && (
        <Tbody>
          {data.map((item, index) => {
            let order_status = "-",
              delivery_status = "-";
            if (item?.order_cancelled) {
              order_status = "Cancelled";
            } else if (item.order_collected) {
              order_status = "Collected";
            } else if (item.order_completed) {
              order_status = "Completed";
            }

            if (item?.delivery_completed) {
              delivery_status = "Completed";
            } else if (item?.delivery_initiated) {
              delivery_status = "Initiated";
            }
            return (
              <Tr key={`${index}`}>
                <Td minWidth={100}>
                  <Text textTransform="capitalize">{item?.id}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.customer_id ?? "-"}</Text>
                </Td>
                <Td minWidth={200}>
                  <Text>{item?.customer_name ?? "-"}</Text>
                </Td>
                <Td minWidth={200}>
                  <Text>{item?.customer_email ?? "-"}</Text>
                </Td>
                <Td minWidth={200}>
                  <Text>{item?.delivery_address ?? "-"}</Text>
                </Td>
                <Td minWidth={200}>
                  <Text>
                    {item?.order_start_time?.split("T")[0] +
                      "  " +
                      item?.order_start_time?.split("T")[1].split(".")[0] ??
                      "-"}
                  </Text>
                </Td>
                <Td minWidth={200}>
                  <Text>
                    {item?.order_end_time?.split("T")[0] +
                      "  " +
                      item?.order_end_time?.split("T")[1].split(".")[0] ?? "-"}
                  </Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.order_type ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{order_status}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{delivery_status}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.partial_return ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.subtotal ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.tax_amount ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.tax_rate ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.delivery_fee ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.discount_amount ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.payment_amount ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.payment_status ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  {/* <Popover>
                    <PopoverTrigger>
                      
                      <Button
                        size="sm"
                        my="10px"
                        mr="20px"
                        width="100px"
                        background="#EDF2F7"
                        color="#474a57"
                        outline="none"
                        onClick={() =>
                          viewJson("reservation", item?.sales_order_id)
                        }
                      >
                        Reservation
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent padding="5px">
                      {JsonContent}
                    </PopoverContent>
                  </Popover> */}
                  <Badge
                    cursor="pointer"
                    colorScheme="purple"
                    onClick={() => viewJson("sale", item?.sales_order_id)}
                  >
                    Sales
                  </Badge>
                  <Badge
                    cursor="pointer"
                    colorScheme="yellow"
                    onClick={() =>
                      viewJson("reservation", item?.sales_order_id)
                    }
                  >
                    Reservation
                  </Badge>
                </Td>
                <Td minWidth={100}>
                  {item?.sales_invoice_failed && (
                    <Badge
                      cursor="pointer"
                      colorScheme="purple"
                      onClick={() => retryFailed("sale", item?.sales_order_id)}
                    >
                      Retry sales Invoice Failed
                    </Badge>
                  )}
                  {item?.reservation_failed && (
                    <Badge
                      cursor="pointer"
                      colorScheme="yellow"
                      onClick={() =>
                        retryFailed("reservation", item?.sales_order_id)
                      }
                    >
                      Retry Reservation Failed
                    </Badge>
                  )}
                </Td>
              </Tr>
            );
          })}
          <Modal
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
                <Text> Request: {JsonContent.request}</Text>
                <Divider margin="20px 0px" />
                <Text> Response: {JsonContent.response}</Text>
              </ModalBody>

              {/* <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost">Secondary Action</Button>
              </ModalFooter> */}
            </ModalContent>
          </Modal>
        </Tbody>
      )}
    </>
  );
};

export default SalesSummaryTable;
