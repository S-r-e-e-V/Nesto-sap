const ReservationStatusKey = (status) => {
  switch (status) {
    case "O":
      return "ordered";
    case "D":
      return "out_for_delivery";
    case "I":
      return "invoiced";
    case "C":
      return "canceled";
    default:
      return "-";
  }
};
export default ReservationStatusKey;
