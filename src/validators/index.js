import * as yup from "yup";

const username = yup
  .string()
  .trim()
  .email("Email must be valid.")
  .required()
  .label("Email");

const password = yup.string().trim().required().label("Password");
const site_id = yup.string().trim().required().label("Site ID");
const website_id = yup.string().trim().required().label("Website ID");
const store_id = yup.string().trim().required().label("Store ID");

export const loginValidationSchema = yup.object().shape({ username, password });
export const signupValidationSchema = yup
  .object()
  .shape({ username, password, site_id, website_id, store_id });
