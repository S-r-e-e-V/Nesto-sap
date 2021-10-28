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

export const login = (PAYLOAD) => {
  const URL = API_BASE_URL + "/console/login";
  return post(URL, PAYLOAD, false);
};
export const getStores = async () => {
  const URL = `${API_BASE_URL}/mis/sites`;
  return get(URL, false, false);
};
export const postreturnOrders = async (PAYLOAD, startLimit, endLimit) => {
  const URL = `${API_BASE_URL}/sap-console/return/list?startLimit=${startLimit}&endLimit=${endLimit}`;
  return post(URL, PAYLOAD, true);
};
export const postreservationOrders = async (PAYLOAD, startLimit, endLimit) => {
  const URL = `${API_BASE_URL}/sap-console/reservation/list?startLimit=${startLimit}&endLimit=${endLimit}`;
  return post(URL, PAYLOAD, true);
};
export const postsalesOrders = async (PAYLOAD, startLimit, endLimit) => {
  const URL = `${API_BASE_URL}/sap-console/sales/list?startLimit=${startLimit}&endLimit=${endLimit}`;
  return post(URL, PAYLOAD, true);
};
export const postfinanceList = async (PAYLOAD, startLimit, endLimit) => {
  const URL = `${API_BASE_URL}/sap-console/finance/list?startLimit=${startLimit}&endLimit=${endLimit}`;
  return post(URL, PAYLOAD, true);
};
export const postondemandList = async (PAYLOAD, startLimit, endLimit) => {
  const URL = `${API_BASE_URL}/sap-console/ondemand/list?startLimit=${startLimit}&endLimit=${endLimit}`;
  return post(URL, PAYLOAD, true);
};
export const postsnapshotList = async (PAYLOAD, startLimit, endLimit) => {
  const URL = `${API_BASE_URL}/sap-console/snapshot/list?startLimit=${startLimit}&endLimit=${endLimit}`;
  return post(URL, PAYLOAD, true);
};
export const postretryFailed = async (PAYLOAD) => {
  const URL = `${API_BASE_URL}/sap-console/retry`;
  return post(URL, PAYLOAD, true, true);
};
export const getJson = async (type, ID) => {
  const URL = `${API_BASE_URL}/sap-console/records/${ID}?type=${type}`;
  return get(URL, true, true);
};
