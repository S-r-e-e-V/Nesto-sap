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

export const ReturnListTableHead = () => (
  <Thead>
    <Tr>
      <Th>Order ID</Th>
      <Th>Magento Order Id</Th>
      <Th>Customer Id</Th>
      <Th>Sap Store Id</Th>
      <Th>Currency Code</Th>
      <Th>Payment Method</Th>
      <Th>Delivery Date</Th>
      <Th>Coupon Code</Th>
      <Th>Grand Total</Th>
      <Th>Discount Amount</Th>
      <Th>Returns</Th>
    </Tr>
  </Thead>
);

export const OrderItemsTableHead = () => (
  <Thead>
    <Tr>
      <Th>Id</Th>
      <Th>Car Order Id</Th>
      <Th>Return Invoiced</Th>
      <Th>Invoiced Returned Date</Th>
    </Tr>
  </Thead>
);
