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
import { SanpshotSkeleton } from "../components/TableSkeletons";
import { getJson, postretryFailed } from "../api";
import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";
import redirectToMagento from "../utils/redirectToMagento";
dayjs.extend(UTC);
const SnapshotTable = ({ emptyLoading, data, setreload }) => {
  const toast = useToast();
  const [JsonContent, setJsonContent] = useState({});
  const [isOpen, setisOpen] = useState(false);
  const [isloading, setisloading] = useState({ loading: -1, type: "" });
  const retryFailed = async (type, number, index, loading_type) => {
    let payload = {
      type: type,
      validateKey: number,
      action: loading_type,
    };
    setisloading({ loading: index, type: loading_type });
    const response = await postretryFailed(payload);
    setisloading({ loading: -1, type: loading_type });
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
          request: JSON.stringify(response.data[0].request),
          response: JSON.stringify(response.data[0].response),
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
      {emptyLoading && <SanpshotSkeleton />}
      {!emptyLoading && data && (
        <Tbody>
          {data.map((item, index) => {
            return (
              <Tr key={`${index}`}>
                <Td minWidth={100}>
                  <Text>{item?.id ?? "-"}</Text>
                </Td>
                <Td minWidth={200}>
                  <Text>{item?.validate_key ?? "-"}</Text>
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
                    onClick={() => viewJson("snapshot", item?.id)}
                  >
                    View
                  </Badge>
                </Td>
                {/* <Td minWidth={100}>
                  <Text>{item?.failed ? "Failed" : "Success"}</Text>
                </Td> */}
                <Td minWidth={200}>
                  {item?.failed && (
                    <Button
                      mx="2px"
                      my="2px"
                      size="sm"
                      isLoading={
                        isloading.loading === index &&
                        isloading.type === "sapSync"
                          ? true
                          : false
                      }
                      disabled={isloading.loading !== -1 ? true : false}
                      loadingText=""
                      colorScheme="green"
                      onClick={() =>
                        retryFailed(
                          "snapshotStock",
                          item?.validate_key,
                          index,
                          "sapSync"
                        )
                      }
                    >
                      Retry sap sync
                    </Button>
                  )}
                  {item?.magento_sync && (
                    <Button
                      size="sm"
                      isLoading={
                        isloading.loading === index &&
                        isloading.type === "magentoSync"
                          ? true
                          : false
                      }
                      disabled={isloading.loading !== -1 ? true : false}
                      loadingText=""
                      colorScheme="twitter"
                      onClick={() =>
                        retryFailed(
                          "snapshotStock",
                          item?.validate_key,
                          index,
                          "magentoSync"
                        )
                      }
                    >
                      Retry magento sync
                    </Button>
                  )}
                  {!item?.failed && !item?.magento_sync && <Text>Nil</Text>}
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

export default SnapshotTable;
