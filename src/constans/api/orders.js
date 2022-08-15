/* eslint-disable import/no-anonymous-default-export */
import axios from "src/configs/axios";
export default {
  all: (option = { params: {} }) => axios.get(`/orders/`, option),
};
