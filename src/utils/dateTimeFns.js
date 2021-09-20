const dateFormatObject = {
  day: "numeric",
  year: "numeric",
  month: "short",
};

const getDate = (dateTimeStamp) => {
  const dateObj = new Date(dateTimeStamp);
  return dateObj.toLocaleDateString([], { dateStyle: "long" });
};

const getDubaiDate = (dateTimeStamp) => {
  const dateObj = new Date(dateTimeStamp);
  return dateObj.toLocaleDateString([], {
    timeZone: "Asia/Dubai",
    dateStyle: "long",
  });
};

const getTime = (dateTimeStamp) => {
  const dateObj = new Date(dateTimeStamp);
  return dateObj.toLocaleTimeString([], {
    timeStyle: "short",
    hour12: true,
  });
};

const getDubaiTime = (dateTimeStamp) => {
  const dateObj = new Date(dateTimeStamp);
  return dateObj.toLocaleTimeString([], {
    timeZone: "Asia/Dubai",
    timeStyle: "short",
    hour12: true,
  });
};

const getDateTime = (dateTimeStamp) => {
  const dateObj = new Date(dateTimeStamp);
  const dateString = dateObj.toLocaleDateString([], { dateStyle: "long" });
  const timeString = dateObj.toLocaleTimeString([], {
    timeStyle: "short",
    hour12: true,
  });
  if (dateString === "Invalid Date" || timeString === "Invalid Date") {
    return "";
  }
  return dateString + ", " + timeString;
};

const getLeanCurrentDateTime = () => {
  const dateObj = new Date();
  const dateString = dateObj.toLocaleDateString([], { dateStyle: "short" });
  const timeString = dateObj.toLocaleTimeString([], {
    timeStyle: "short",
    hour12: true,
  });
  const draft = dateString + "_" + timeString;

  return draft.replaceAll("/", "-").replaceAll(":", "-").replaceAll(" ", "");
};

const getDatePair = (startDate, endDate) => {
  let cloneStartDate = new Date(startDate);
  let cloneEndDate = new Date(endDate);
  cloneStartDate.setHours(0, 0, 0, 0); // Offset to previous midnight
  cloneEndDate.setHours(24, 0, 0, 0); // Offset to next midnight
  const start_date = new Date(cloneStartDate).toISOString();
  const end_date = new Date(cloneEndDate).toISOString();
  return [start_date, end_date];
};

const dateStartEnd = () => {
  const DEFAULT_START_DATE = new Date("2021");
  let DEFAULT_END_DATE = new Date();
  DEFAULT_END_DATE.setDate(DEFAULT_END_DATE.getDate() + 30);

  const DEFAULT_START_DATE_FORMATTED = DEFAULT_START_DATE.toLocaleDateString(
    "en-US",
    dateFormatObject
  );

  const DEFAULT_END_DATE_FORMATTED = DEFAULT_END_DATE.toLocaleDateString(
    "en-US",
    dateFormatObject
  );
  return {
    DEFAULT_START_DATE,
    DEFAULT_START_DATE_FORMATTED,
    DEFAULT_END_DATE,
    DEFAULT_END_DATE_FORMATTED,
    dateFormatObject,
  };
};

export {
  getTime,
  getDate,
  getDubaiTime,
  getDubaiDate,
  getDateTime,
  getLeanCurrentDateTime,
  getDatePair,
  dateStartEnd,
};
