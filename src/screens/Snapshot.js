import React, { useState, useEffect, forwardRef, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Table,
  Flex,
  Select,
  useToast,
  Button,
  Box,
  Input,
  Badge,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { SnapshotStockTableHead } from "../components/TableHeads";

import { postsnapshotList, getStores } from "../api";
import PageSwitcher from "../components/PageSwitcher";
import SnapshotTable from "../containers/SnapshotTable";

function Snapshot(props) {
  const searchEl = useRef(null);

  const toast = useToast();

  const params = new URLSearchParams(useLocation().search);
  const defaultSiteID = params.get("id");

  const [isViewIcon, setIsViewIcon] = useState(true);
  const [page, setPage] = useState(1);
  const [reload, setreload] = useState(false);
  const [startLimit, setstartLimit] = useState(0);
  const [endLimit, setendLimit] = useState(10);
  const [selectedSite, setselectedSite] = useState(defaultSiteID);
  const [selectedTable, setselectedTable] = useState("");
  const [Failed, setFailed] = useState(false);
  const [searchFilter, setsearchFilter] = useState("");

  var start_date = new Date();
  start_date.setMonth(start_date.getMonth() - 1);
  const [startDate, setstartDate] = useState(start_date);
  const [endDate, setendDate] = useState(new Date());

  const [emptyLoading, setemptyLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const loadSites = async () => {
      try {
        const sites = await getStores();
        if (sites) {
          setSites(Object.values(sites));
        }
      } catch (e) {
        console.log(e);
        setSites([]);
      }
    };

    loadSites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getReservationList = async () => {
    setemptyLoading(true);
    let payload = {
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      // reservation_type: selectedTable === "" ? [] : [selectedTable],
      snapshot_stock_failed: Failed === "true" ? true : false,
      searchTerm: searchFilter,
      store_id: selectedSite,
    };
    const response = await postsnapshotList(payload, startLimit, endLimit);
    if (response.status === 400 || response.orderCount === 0) {
      toast({
        description: "List is empty",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    }
    setemptyLoading(false);
    setdata(response);
  };
  console.log("data", data);
  useEffect(() => {
    getReservationList();
  }, [
    page,
    selectedSite,
    selectedTable,
    Failed,
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
      <Box width="185px" mr="20px" my="10px">
        <Badge variant="subtle" fontSize="16px" colorScheme="blue">
          Snapshot Stock
        </Badge>
      </Box>
      <Flex width={"100%"} wrap="wrap" justifyContent="space-between" my="10px">
        <Select
          variant="filled"
          placeholder={sites?.length ? "Select site" : "No sites found"}
          defaultValue={selectedSite}
          value={selectedSite}
          onChange={(e) => {
            setPageNumber(1);
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
        {/* <Select
          variant="filled"
          defaultValue="List All"
          value={selectedTable}
          onChange={(e) => {
            setPageNumber(1);
            setselectedTable(e?.target?.value);
          }}
          size="sm"
          width="150px"
          borderRadius="5px"
          mr="20px"
          my="10px"
        >
          <option value="" key="all">
            Type: List All
          </option>
          <option value="create" key="create">
            Type: Create
          </option>
          <option value="update" key="update">
            Type: Update
          </option>
          <option value="status_update" key="status_update">
            Type: Status Update
          </option>
          <option value="delete" key="delete">
            Type: Delete
          </option>
        </Select> */}
        <Select
          variant="filled"
          defaultValue="List All"
          value={Failed}
          onChange={(e) => {
            setPageNumber(1);
            setFailed(e?.target?.value);
          }}
          size="sm"
          width="150px"
          borderRadius="5px"
          mr="20px"
          my="10px"
        >
          <option value="false" key="all">
            List All
          </option>
          <option value="true" key="failed">
            Snapshot Stock Failed
          </option>
        </Select>
        <Box my="10px" mr="20px">
          <DatePicker
            selected={startDate}
            maxDate={startDate > endDate ? endDate : new Date()}
            onChange={(date) => {
              setPageNumber(1);
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
              setPageNumber(1);
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

        <Flex alignItems="center">
          <Input
            ref={searchEl}
            placeholder="search"
            size="sm"
            my="10px"
            mr="20px"
            width="350px"
          />
          <Button
            size="sm"
            my="10px"
            mr="20px"
            width="100px"
            background="#EDF2F7"
            color="#474a57"
            outline="none"
            onClick={() => {
              setPageNumber(1);
              setsearchFilter(searchEl.current.value);
            }}
          >
            Search
          </Button>
        </Flex>
      </Flex>
      <Flex overflowX="auto">
        <Table variant="simple" size="sm">
          <SnapshotStockTableHead />
          <SnapshotTable
            data={data.snapshotStockList ?? []}
            emptyLoading={emptyLoading}
            setreload={setreload}
          />
        </Table>
      </Flex>
      {!emptyLoading && (
        <PageSwitcher
          page={page}
          setter={setPageNumber}
          total={Math.ceil(data?.orderCount / 10)}
          setHasPageChanged={setHasPageChanged}
        />
      )}
    </Flex>
  );
}

export default Snapshot;
