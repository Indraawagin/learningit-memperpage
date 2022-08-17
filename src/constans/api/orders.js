/* eslint-disable import/no-anonymous-default-export */
import axios from "src/configs/axios";
export default {
  all: (options = { params: {} }) => axios.get(`/orders`, options),
};
