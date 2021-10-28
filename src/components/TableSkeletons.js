import { Skeleton, Tbody, Td, Tr } from "@chakra-ui/react"; //Table Imports
const ReturnListSkeleton = () => (
  <Tbody>
    {[1, 2, 3].map((i) => (
      <Tr key={i}>
        <Td minWidth={200}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={200}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
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
      </Tr>
    ))}
  </Tbody>
);
const ReservationListSkeleton = () => (
  <Tbody>
    {[1, 2, 3].map((i) => (
      <Tr key={i}>
        <Td minWidth={200}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
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
      </Tr>
    ))}
  </Tbody>
);
const SalesListSkeleton = () => (
  <Tbody>
    {[1, 2, 3].map((i) => (
      <Tr key={i}>
        <Td minWidth={200}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={200}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={100}>
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
      </Tr>
    ))}
  </Tbody>
);
const FinancialPostingSkeleton = () => (
  <Tbody>
    {[1, 2, 3].map((i) => (
      <Tr key={i}>
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
      </Tr>
    ))}
  </Tbody>
);
const OndemandSkeleton = () => (
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
        <Td minWidth={100}>
          <Skeleton height="25px" />
        </Td>
        <Td minWidth={200}>
          <Skeleton height="25px" />
        </Td>
      </Tr>
    ))}
  </Tbody>
);
const SanpshotSkeleton = () => (
  <Tbody>
    {[1, 2, 3].map((i) => (
      <Tr key={i}>
        <Td minWidth={100}>
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
        <Td minWidth={200}>
          <Skeleton height="25px" />
        </Td>
      </Tr>
    ))}
  </Tbody>
);
export {
  ReturnListSkeleton,
  ReservationListSkeleton,
  SalesListSkeleton,
  FinancialPostingSkeleton,
  OndemandSkeleton,
  SanpshotSkeleton,
};
