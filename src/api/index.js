import Package from "../../package.json";
import {
  get,
  post,
  getStageString,
  getStageStringRaw,
  getStageStringPrefix,
} from "./networkUtils";

const API_BASE_URL = process.env.REACT_APP_URL;

const AUTH_BASE_URL = "https://auth.nesto.shop" + getStageString(API_BASE_URL);

const STAGE_PREFIX = getStageStringPrefix(API_BASE_URL);
const MAGENTO_BASE_URL = `https://${STAGE_PREFIX}nesto.shop/rest/V1`;

export const STAGE = getStageStringRaw(API_BASE_URL);
export const versionString = `Version: ${Package.version} ${STAGE}`;

// Endpoints that Doesn't Require Authentication 🔓
export const login = (PAYLOAD) => {
  const URL = API_BASE_URL + "/console/login";
  return post(URL, PAYLOAD, false);
};
export const getStores = async () => {
  const URL = `${MAGENTO_BASE_URL}/nestoWebsites`;
  return get(URL, false, true);
};

export const postSapcarOrders = async (PAYLOAD, startLimit, endLimit) => {
  const URL = `${API_BASE_URL}/sap-car/orders/list?startLimit=${startLimit}&endLimit=${endLimit}`;
  return post(URL, PAYLOAD, true);
};
export const postretryFailed = async (PAYLOAD, ID) => {
  const URL = `${API_BASE_URL}/sap-console/retry/${ID}`;
  return post(URL, PAYLOAD, true, true);
};
export const getJson = async (type, ID) => {
  const URL = `${API_BASE_URL}/sap-console/records/${ID}?type=${type}`;
  return get(URL, true, true);
};

// Endpoints that Require Authentication 🔐
// export const confirmSubstitution = async (PAYLOAD) => {
//   const URL = API_BASE_URL + "/crm/status";
//   return post(URL, PAYLOAD, true);
// };
