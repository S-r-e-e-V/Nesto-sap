import { Thead, Tr, Th } from "@chakra-ui/react"; //Table Imports

export const OrderListTableHead = () => (
  <Thead>
    <Tr>
      <Th>Order ID</Th>
      <Th>Customer Id</Th>
      <Th>Customer name</Th>
      <Th>Customer email</Th>
      <Th>Delivery address</Th>
      <Th>Order start time</Th>
      <Th>Order end time</Th>
      <Th>Order type</Th>
      <Th>Order status</Th>
      <Th>Delivery status</Th>
      <Th>Partial return</Th>
      <Th>Subtotal</Th>
      <Th>Tax amount</Th>
      <Th>Tax rate</Th>
      <Th>Delivery fee</Th>
      <Th>Discount amount</Th>
      <Th>Payment amount</Th>
      <Th>Payment status</Th>
      <Th>View Json</Th>
    </Tr>
  </Thead>
);
