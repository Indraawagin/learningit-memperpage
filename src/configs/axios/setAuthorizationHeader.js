/* eslint-disable import/no-anonymous-default-export */
import axios from "./index.js";

export default (token = null) => {
  if (token) axios.defaults.headers.common.authorization = token;
  else delete axios.defaults.headers.common.authorization;
};
