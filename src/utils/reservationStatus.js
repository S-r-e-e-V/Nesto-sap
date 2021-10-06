const ReservationStatus = (status) => {
  switch (status) {
    case "O":
      return "Ordered";
    case "D":
      return "Out for delivery";
    case "I":
      return "Invoiced";
    case "C":
      return "Canceled";
    default:
      return "-";
  }
};
export default ReservationStatus;
