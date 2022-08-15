import { FETCH_ORDERS, STATUS_ORDERS, MESSAGE_ORDER } from "src/constans/types/orders";

export const statusOrders = (status) => ({
  type: STATUS_ORDERS,
  payload: status,
});
export const fetchOrders = (fetch) => ({
  type: FETCH_ORDERS,
  payload: fetch,
});
export const messageOrder = (message) => ({
  type: MESSAGE_ORDER,
  payload: message,
});
