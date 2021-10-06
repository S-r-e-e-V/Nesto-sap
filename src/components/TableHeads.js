import { Thead, Tr, Th } from "@chakra-ui/react"; //Table Imports
// delete 🗑
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
// delete 🗑
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
      <Th>Car Order Items</Th>
      <Th>Returns</Th>
    </Tr>
  </Thead>
);
export const SalesTableHead = () => (
  <Thead>
    <Tr>
      <Th>Id</Th>
      <Th>Increment Id</Th>
      <Th>Order Id</Th>
      <Th>Sap Car Order Id</Th>
      <Th>Customer Id</Th>
      <Th>Sales Invoiced</Th>
      <Th>Sales Invoiced Time</Th>
      <Th>Reservation Status</Th>
      <Th>Grand Total</Th>
      <Th>Json</Th>
      <Th>Sales Invoice Failed</Th>
    </Tr>
  </Thead>
);
export const ReturnsTableHead = () => (
  <Thead>
    <Tr>
      <Th>Id</Th>
      <Th>Increment Id</Th>
      <Th>Order Id</Th>
      <Th>Sap Car Order Id</Th>
      <Th>Customer Id</Th>
      <Th>Return Invoiced</Th>
      <Th>Return Invoiced Time</Th>
      <Th>Reservation Status</Th>
      <Th>Grand Total</Th>
      <Th>Json</Th>
      <Th>Return Failed</Th>
    </Tr>
  </Thead>
);

export const ReservationTableHead = () => (
  <Thead>
    <Tr>
      <Th>Reservation Id</Th>
      <Th>Increment Id</Th>
      <Th>Order Id</Th>
      <Th>Sap Car Order Id</Th>
      <Th>Customer Id</Th>
      <Th>Reservation Type</Th>
      <Th>Reservation Status</Th>
      <Th>Grand Total</Th>
      <Th>Json</Th>
      <Th>Reservation Failed</Th>
    </Tr>
  </Thead>
);
// delete 🗑
export const OrderItemsTableHead = () => (
  <Thead>
    <Tr>
      <Th>Id</Th>
      <Th>Item Id</Th>
      <Th>Car Order Id</Th>
      <Th>Article Number</Th>
      <Th>Quantity</Th>
      <Th>Quantity Returned</Th>
      <Th>Unit of Measurement</Th>
      <Th>Price</Th>
      <Th>Tax</Th>
      <Th>Tax Code</Th>
    </Tr>
  </Thead>
);
