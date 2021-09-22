import React, { useState, useEffect, forwardRef, useRef } from "react";
import {
  Table,
  TableCaption,
  Flex,
  Select,
  useToast,
  Button,
  Box,
  Input,
  Badge,
  Popover,
  PopoverTrigger,
  Tooltip,
  PopoverContent,
  Text,
} from "@chakra-ui/react";
import {
  CalendarIcon,
  Search2Icon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";

import {
  OrderListTableHead,
  ReturnListTableHead,
} from "../components/TableHeads";
import OrderTable from "../containers/OrderTable";
import ReturnOrderTable from "../containers/ReturnOrderTable";

import { postSapcarOrders, getStores, postreturnOrders } from "../api";
import PageSwitcher from "../components/PageSwitcher";

function SapCar(props) {
  const searchEl = useRef(null);

  const [isViewIcon, setIsViewIcon] = useState(true);
  const [page, setPage] = useState(1);
  const [reload, setreload] = useState(false);
  const [startLimit, setstartLimit] = useState(0);
  const [endLimit, setendLimit] = useState(10);
  const [selectedSite, setselectedSite] = useState("8042");
  const [selectedTable, setselectedTable] = useState("all");
  const [searchFilter, setsearchFilter] = useState("");

  var start_date = new Date();
  start_date.setMonth(start_date.getMonth() - 1);
  const [startDate, setstartDate] = useState(start_date);
  const [endDate, setendDate] = useState(new Date());
  //   const toast = useToast();

  const [emptyLoading, setemptyLoading] = useState(false);
  const [orders, setorders] = useState([]);
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const loadSites = async () => {
      try {
        const sites = await getStores();
        if (sites) {
          const parsedSites = JSON.parse(sites);
          const siteArray = Object.values(parsedSites);
          setSites(siteArray);
        }
      } catch (e) {
        console.log(e);
        setSites([]);
      }
    };

    loadSites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getOrders = async () => {
    setemptyLoading(true);
    let payload =
      selectedTable === "return_orders"
        ? {
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            sales_invoice_failed:
              selectedTable === "sales_invoice_failed" ? true : false,
            reservation_failed:
              selectedTable === "reservation_failed" ? true : false,
            searchTerm: searchFilter,
            store_id: selectedSite,
          }
        : {
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            sales_invoice_failed:
              selectedTable === "sales_invoice_failed" ? true : false,
            reservation_failed:
              selectedTable === "reservation_failed" ? true : false,
            searchTerm: searchFilter,
            site_id: selectedSite,
          };
    const response =
      selectedTable === "return_orders"
        ? await postreturnOrders(payload, startLimit, endLimit)
        : await postSapcarOrders(payload, startLimit, endLimit);
    setemptyLoading(false);
    setorders(response);
  };
  console.log(orders);
  useEffect(() => {
    getOrders();
  }, [
    page,
    selectedSite,
    selectedTable,
    searchFilter,
    startDate,
    endDate,
    reload,
  ]);

  //   const errorToast = (error) =>
  //     toast({
  //       title: "Failed to generate report",
  //       description: error?.data?.message ?? "Something went wrong",
  //       status: "error",
  //       duration: 2500,
  //       isClosable: true,
  //     });
  const setHasPageChanged = () => {};
  const CustomDatePicker = forwardRef(({ value, onClick, title }, ref) => (
    <Button
      size="sm"
      onClick={onClick}
      //   disabled={isLoading}
      ref={ref}
      leftIcon={<CalendarIcon />}
    >
      {title}: {value}
    </Button>
  ));
  const setPageNumber = (value) => {
    setstartLimit((value - 1) * 10);
    setendLimit(value * 10);
    setPage(value);
  };
  return (
    <Flex direction="column">
      {/* <Center> */}
      <Box width="185px" mr="20px" my="10px">
        <Badge variant="subtle" fontSize="16px" colorScheme="blue">
          Orders
        </Badge>
      </Box>
      {/* </Center> */}
      <Flex width={"100%"} wrap="wrap" justifyContent="space-between" my="10px">
        <Select
          variant="filled"
          placeholder={sites?.length ? "Select site" : "No sites found"}
          defaultValue={selectedSite}
          value={selectedSite}
          onChange={(e) => {
            setselectedSite(e?.target?.value);
          }}
          size="sm"
          width="150px"
          borderRadius="5px"
          mr="20px"
          my="10px"
        >
          {sites?.length
            ? sites?.map((site) => (
                <option value={site.sap_website_id} key={site.sap_website_id}>
                  Site:&nbsp;{site?.sap_website_id}
                </option>
              ))
            : null}
        </Select>
        <Select
          variant="filled"
          defaultValue="List All"
          value={selectedTable}
          onChange={(e) => {
            setselectedTable(e?.target?.value);
          }}
          size="sm"
          width="150px"
          borderRadius="5px"
          mr="20px"
          my="10px"
        >
          <option value="all" key="all">
            List All
          </option>
          <option value="reservation_failed" key="reservation_failed">
            Reservation Failed
          </option>
          <option value="sales_invoice_failed" key="sales_invoice_failed">
            Sales Invoice Failed
          </option>
          <option value="return_orders" key="return_orders">
            Return Orders
          </option>
        </Select>
        <Box my="10px" mr="20px">
          <DatePicker
            selected={startDate}
            maxDate={startDate > endDate ? endDate : new Date()}
            onChange={(date) => {
              setstartDate(date);
            }}
            dateFormat="PP"
            title={"From"}
            customInput={<CustomDatePicker />}
            todayButton="Select today"
            showPopperArrow={false}
            popperPlacement="bottom"
            // disabled={isLoading}
          />
        </Box>

        <Box my="10px" mr="20px">
          <DatePicker
            selected={endDate}
            minDate={startDate}
            maxDate={new Date()}
            onChange={(date) => {
              setendDate(date);
            }}
            dateFormat="PP"
            title={"To"}
            customInput={<CustomDatePicker />}
            todayButton="Select today"
            showPopperArrow={false}
            popperPlacement="bottom"
            // disabled={isLoading}
          />
        </Box>

        {/* <Popover>
          <PopoverTrigger>
            <Tooltip label={isViewIcon ? "View JSON" : "Hide JSON"} hasArrow>
              <Button
                background="#EDF2F7"
                color="#474a57"
                outline="none"
                onClick={() => {
                  setIsViewIcon(!isViewIcon);
                }}
                mr="10px"
              >
                {isViewIcon ? (
                  <ViewIcon h="1em" w="1em" />
                ) : (
                  <ViewOffIcon h="1em" w="1em" />
                )}
              </Button>
            </Tooltip>
          </PopoverTrigger>
          <PopoverContent
            // position="left"
            height="500px"
            width="400px"
            overflow="scroll"
            // marginLeft="-200px"
          >
            <Text fontSize="12px">
              {
                "lksdflksfjlksdjflksd sd fs jklsdj lskdfjsdd fsdlkfjslkdfj sdf fsdkfjsdklfj"
              }
            </Text>
          </PopoverContent>
        </Popover> */}
        <Flex alignItems="center">
          <Input
            ref={searchEl}
            placeholder="search"
            size="sm"
            my="10px"
            mr="20px"
            width="350px"
          />
          {/* <Search2Icon
            onClick={() => {
              setsearchFilter(searchEl.current.value);
            }}
          /> */}
          <Button
            size="sm"
            my="10px"
            mr="20px"
            width="100px"
            background="#EDF2F7"
            color="#474a57"
            outline="none"
            onClick={() => {
              setsearchFilter(searchEl.current.value);
            }}
          >
            Search
          </Button>
        </Flex>
      </Flex>
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
          >
            View Json
          </Button>
        </PopoverTrigger>
        <PopoverContent padding="5px">
          Json content
        </PopoverContent>
      </Popover> */}
      <Flex overflowX="auto">
        {selectedTable === "return_orders" ? (
          <Table variant="simple" size="sm">
            <ReturnListTableHead />
            <ReturnOrderTable
              data={orders.orderList ?? []}
              emptyLoading={emptyLoading}
              setreload={setreload}
            />
          </Table>
        ) : (
          <Table variant="simple" size="sm">
            <OrderListTableHead />
            <OrderTable
              data={orders.orderList ?? []}
              emptyLoading={emptyLoading}
              setreload={setreload}
            />
          </Table>
        )}
      </Flex>
      {!emptyLoading && (
        <PageSwitcher
          page={page}
          setter={setPageNumber}
          total={parseInt(orders?.totalCount / 10)}
          setHasPageChanged={setHasPageChanged}
        />
      )}
    </Flex>
  );
}

export default SapCar;
