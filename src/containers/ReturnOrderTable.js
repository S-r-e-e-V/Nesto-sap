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
import { OrderItemsTableHead } from "../components/TableHeads";
import ReturnItemsTable from "../containers/ReturnItemsTable";
import { ReturnListSkeleton } from "../components/TableSkeletons";
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
  const [isopenOrderItems, setisopenOrderItems] = useState(false);
  const [OrderItems, setOrderItems] = useState();
  let order = {
    car_order_items: [
      { item_id: "123", type: "kfjlsdkfj" },
      { item_id: "123", type: "kfjlsdkfj" },
      { item_id: "123", type: "kfjlsdkfj" },
      { item_id: "123", type: "kfjlsdkfj" },
      { item_id: "123", type: "kfjlsdkfj" },
    ],
  };
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
    setisopenOrderItems(false);
  };
  return (
    <>
      {emptyLoading && <ReturnListSkeleton />}
      {!emptyLoading && data && (
        <Tbody>
          {data.map((item, index) => {
            return (
              <Tr key={`${index}`}>
                <Td minWidth={100}>
                  <Text>{item?.id}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.magento_order_id ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.customer_id ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.sap_store_id ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.currency_code ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.payment_method ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.coupon_code ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.coupon_code ?? "-"}</Text>
                </Td>
                <Td minWidth={150}>
                  <Text>{item?.delivery_date ?? "-"}</Text>
                </Td>
                <Td minWidth={100}>
                  <Text>{item?.discount_amount ?? "-"}</Text>
                </Td>
                <Td minWidth={150}>
                  {item?.returns ? (
                    <Badge
                      cursor="pointer"
                      colorScheme="green"
                      onClick={() => {
                        setOrderItems(item);
                        setisopenOrderItems(true);
                      }}
                    >
                      View Returns
                    </Badge>
                  ) : (
                    <Badge colorScheme="red">Nil</Badge>
                  )}
                </Td>

                <Td minWidth={100}>
                  <Badge
                    cursor="pointer"
                    colorScheme="purple"
                    onClick={() => viewJson("return", item?.id)}
                  >
                    Return
                  </Badge>
                </Td>
                {/* <Td minWidth={100}>
                  {item?.sales_invoice_failed && (
                    <Badge
                      cursor="pointer"
                      colorScheme="purple"
                      onClick={() => retryFailed("sales", item?.sales_order_id)}
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
                </Td> */}
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
            </ModalContent>
          </Modal>
          <Modal
            isOpen={isopenOrderItems}
            onClose={onClose}
            scrollBehavior="inside"
            isCentered
            size="lg"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textTransform="capitalize">Returns</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Table variant="simple" size="sm">
                  <OrderItemsTableHead />
                  <ReturnItemsTable data={OrderItems.returns ?? []} />
                </Table>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Tbody>
      )}
    </>
  );
};

export default SalesSummaryTable;
