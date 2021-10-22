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
  Button,
} from "@chakra-ui/react"; //Table Imports
import { useState } from "react";
import ReservationStatusKey from "../utils/reservationStatusKey";
import ReservationStatus from "../utils/reservationStatus";
import { FinancialPostingSkeleton } from "../components/TableSkeletons";
import { getJson, postretryFailed } from "../api";
import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";
import redirectToMagento from "../utils/redirectToMagento";
dayjs.extend(UTC);
const FinancialPostingTable = ({ emptyLoading, data, setreload }) => {
  const toast = useToast();
  const [JsonContent, setJsonContent] = useState({});
  const [isOpen, setisOpen] = useState(false);
  const [isloading, setisloading] = useState(false);
  const retryFailed = async (type, action, status, id) => {
    let payload = {
      type: type,
      action: action,
      status: ReservationStatusKey(status),
    };
    setisloading(true);
    const response = await postretryFailed(payload, id);
    setisloading(false);
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
  return (
    <>
      {emptyLoading && <FinancialPostingSkeleton />}
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
                        .format("DD/MM/YY H:mm:s") ?? "-"
                    }`}
                  </Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.sequence_number ?? "-"}</Text>
                </Td>
                <Td minWidth={200}>
                  <Text>{item?.financial_sequence_number ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.type ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>
                    {`${
                      dayjs(item?.requested_timestamp)
                        .local()
                        .format("DD/MM/YY H:mm:s") ?? "-"
                    }`}
                  </Text>
                </Td>
                <Td minWidth={100}>
                  <Text>
                    {`${
                      dayjs(item?.responded_timestamp)
                        .local()
                        .format("DD/MM/YY H:mm:s") ?? "-"
                    }`}
                  </Text>
                </Td>
                <Td minWidth={100}>
                  <Badge
                    cursor="pointer"
                    colorScheme="purple"
                    onClick={() => viewJson("finance", item?.id)}
                  >
                    View
                  </Badge>
                </Td>
                <Td minWidth={100}>
                  <Text>
                    {item?.financial_posting_failed ? "Failed" : "Success"}
                  </Text>
                </Td>
                {/* <Td minWidth={100}>
                  {item?.financial_posting_failed ? (
                    <Button
                      isLoading={isloading}
                      loadingText=""
                      colorScheme="green"
                      onClick={() =>
                        retryFailed(
                          "finance",
                          item?.reservation_type?.toUpperCase() ?? null,
                          item?.reservation_status,
                          item?.magento_order_id
                        )
                      }
                    >
                      Retry
                    </Button>
                  ) : (
                    <Text>-</Text>
                  )}
                </Td> */}
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

export default FinancialPostingTable;
