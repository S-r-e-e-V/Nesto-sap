import axios from "axios";

const ACCESS_TOKEN_STRING = "accessToken";
const USERNAME_STRING = "username";

const DEFAULT_CONFIG = {
  headers: {
    "content-type": "application/json",
  },
};

const networkErrorLogger = (error) => {
  if (error.response) {
    // When response status code is out of 2xxx range
    console.log(error.response.data);
    console.log(error.response.status);
    if (error.response.status === 401) {
      if (window.localStorage.getItem(ACCESS_TOKEN_STRING) != null) {
        window.localStorage.removeItem(ACCESS_TOKEN_STRING);
        window.localStorage.removeItem(USERNAME_STRING);
        window.location.reload();
      }
    }
    const errMsg =
      error?.response?.data?.error ??
      error?.response?.data?.message ??
      "Response Failed.";
    throw new Error(errMsg);
  } else if (error.request) {
    //When no response was received after request was made
    throw new Error("Request Failed.");
    // console.log(error.request);
  } else {
    // Error
    throw new Error("Something went wrong.");
    // console.log(error.message);
  }
};

const setUpConfig = (isAuthenticated) => {
  if (isAuthenticated) {
    return {
      headers: {
        "content-type": "application/json",
        "access-token": window.localStorage.getItem("auth"),
      },
    };
  } else {
    return DEFAULT_CONFIG;
  }
};

const get = async (URL, isAuthenticated = true, getFullResult = false) => {
  try {
    const CONFIG = setUpConfig(isAuthenticated);
    const result = await axios.get(URL, CONFIG);
    if (getFullResult) {
      return result.data;
    } else {
      return result.data.data;
    }
  } catch (e) {
    networkErrorLogger(e);
  }
};

const post = async (
  URL,
  PAYLOAD = {},
  isAuthenticated = true,
  getFullResult = false
) => {
  try {
    const CONFIG = setUpConfig(isAuthenticated);
    const result = await axios.post(URL, PAYLOAD, CONFIG);
    if (getFullResult) {
      return result.data;
    } else {
      return result.data.data;
    }
  } catch (e) {
    if (e.response.status === 400) {
      return { status: e.response.status, message: e?.response?.data?.message };
    }
    networkErrorLogger(e);
  }
};

const getStageString = (apiBaseURL) => {
  if (apiBaseURL.includes("staging")) {
    return "/staging";
  }
  if (apiBaseURL.includes("dev")) {
    return "/dev";
  }
  return "";
};

const getStageStringPrefix = (apiBaseURL) => {
  if (apiBaseURL.includes("staging")) {
    return "staging.";
  }
  if (apiBaseURL.includes("dev")) {
    return "staging.";
  }
  return "";
};

const getStageStringRaw = (apiBaseURL) => {
  if (apiBaseURL.includes("staging")) {
    return "staging";
  }
  if (apiBaseURL.includes("dev")) {
    return "dev";
  }
  return "";
};

export { post, get, getStageString, getStageStringRaw, getStageStringPrefix };
