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
  ModalContent,
  ModalHeader,
  Flex,
  Divider,
} from "@chakra-ui/react"; //Table Imports
import { useState } from "react";
import ReservationStatusKey from "../utils/reservationStatusKey";
import ReservationStatus from "../utils/reservationStatus";
import { ReservationListSkeleton } from "../components/TableSkeletons";
import { getJson, postretryFailed } from "../api";
import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";
import redirectToMagento from "../utils/redirectToMagento";
dayjs.extend(UTC);
// import MapsLink from "../components/MapsLink";
// import ItemsTotal from "./ItemsTotal";
// import OrderDetails from "./OrderDetails";

const ReservationOrderTable = ({ emptyLoading, data, setreload }) => {
  const toast = useToast();
  const [JsonContent, setJsonContent] = useState({});
  const [isOpen, setisOpen] = useState(false);
  const retryFailed = async (type, action, status, id) => {
    let payload = {
      type: type,
      action: action,
      status: ReservationStatusKey(status),
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
  };
  console.log(decodeURIComponent(JsonContent.response));
  return (
    <>
      {emptyLoading && <ReservationListSkeleton />}
      {!emptyLoading && data && (
        <Tbody>
          {data.map((item, index) => {
            return (
              <Tr key={`${index}`}>
                {/* <Td minWidth={100}>
                  <Text>{item?.id}</Text>
                </Td> */}
                <Td minWidth={200}>
                  <Text>
                    {`${
                      dayjs(item?.request_timestamp)
                        .local()
                        .format("DD/MM/YY") ?? "-"
                    }`}
                  </Text>
                </Td>
                <Td minWidth={100}>
                  <Text
                    cursor="pointer"
                    onClick={() =>
                      redirectToMagento(item?.car_order?.magento_order_id)
                    }
                  >
                    {item?.car_order?.increment_id ?? "-"}
                  </Text>
                </Td>
                <Td minWidth={200}>
                  <Text>{item?.car_order?.reservation_guid ?? "-"}</Text>
                </Td>
                {/* <Td minWidth={100}>
                  <Text>{item?.car_order?.magento_order_id ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.carOrderId ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.car_order?.customer_id ?? "-"}</Text>
                </Td> */}
                <Td minWidth={100}>
                  <Text>{item?.reservation_type ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>
                    {ReservationStatus(item?.car_order?.reservation_status)}
                  </Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.car_order?.grand_total ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Badge
                    cursor="pointer"
                    colorScheme="purple"
                    onClick={() => viewJson("reservation", item?.id)}
                  >
                    View
                  </Badge>
                </Td>
                <Td minWidth={100}>
                  {item?.reservation_failed ? (
                    <Badge
                      cursor="pointer"
                      colorScheme="green"
                      onClick={() =>
                        retryFailed(
                          "reservation",
                          item?.reservation_type?.toUpperCase() ?? null,
                          item?.car_order?.reservation_status,
                          item?.car_order?.magento_order_id
                        )
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
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="inside"
            isCentered
            size="xl"
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
                        dayjs(JsonContent?.request_timestamp)
                          .local()
                          .format("DD/MM/YY H:mm:ss A") ?? "-"
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
                        dayjs(JsonContent?.response_timestamp)
                          .local()
                          .format("DD/MM/YY H:mm:ss A") ?? "-"
                      }]`}{" "}
                    </Flex>
                  </Flex>
                  {JsonContent.response}
                </Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Tbody>
      )}
    </>
  );
};

export default ReservationOrderTable;
