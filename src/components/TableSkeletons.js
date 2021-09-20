import {
  Container,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Stack,
} from "@chakra-ui/react"; //Table Imports

const OrderListSkeleton = () => (
  <Tbody>
    {[1, 2, 3].map((i) => (
      <Tr key={i}>
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={200}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={200}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={200}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={200}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={200}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
      </Tr>
    ))}
  </Tbody>
);
export { OrderListSkeleton };
