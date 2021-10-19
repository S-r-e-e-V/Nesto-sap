import { Thead, Tr, Th } from "@chakra-ui/react"; //Table Imports

export const SalesTableHead = () => (
  <Thead>
    <Tr>
      <Th>Date</Th>
      <Th>Increment Id</Th>
      <Th>Reservation Guid</Th>
      <Th>Sales Invoiced</Th>
      <Th>Sales Invoiced Time</Th>
      <Th>Reservation Status</Th>
      <Th>Grand Total</Th>
      <Th>Request and Response</Th>
      <Th>Actions</Th>
    </Tr>
  </Thead>
);
export const ReturnsTableHead = () => (
  <Thead>
    <Tr>
      <Th>Date</Th>
      <Th>Increment Id</Th>
      <Th>Reservation Guid</Th>
      <Th>Return Invoiced</Th>
      <Th>Return Invoiced Time</Th>
      <Th>Reservation Status</Th>
      <Th>Grand Total</Th>
      <Th>Return Items Total</Th>
      <Th>Request and Response</Th>
      <Th>Actions</Th>
    </Tr>
  </Thead>
);

export const ReservationTableHead = () => (
  <Thead>
    <Tr>
      <Th>Date</Th>
      <Th>Increment Id</Th>
      <Th>Reservation Guid</Th>
      <Th>Reservation Type</Th>
      <Th>Reservation Status</Th>
      <Th>Grand Total</Th>
      <Th>Request and Response</Th>
      <Th>Actions</Th>
    </Tr>
  </Thead>
);
export const FinancialPostingTableHead = () => (
  <Thead>
    <Tr>
      <Th>Date</Th>
      <Th>Sequence Number</Th>
      <Th>Type</Th>
      <Th>Financial Posting Date</Th>
      <Th>Request and Response</Th>
      <Th>Actions</Th>
    </Tr>
  </Thead>
);
export const OnDemandStockTableHead = () => (
  <Thead>
    <Tr>
      <Th>ID</Th>
      <Th>Request Time</Th>
      <Th>Response Time</Th>
      <Th>Request</Th>
      <Th>Response</Th>
    </Tr>
  </Thead>
);
export const SnapshotStockTableHead = () => (
  <Thead>
    <Tr>
      <Th>ID</Th>
      <Th>Request Time</Th>
      <Th>Response Time</Th>
      <Th>Request</Th>
      <Th>Response</Th>
    </Tr>
  </Thead>
);
