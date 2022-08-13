/* eslint-disable import/no-anonymous-default-export */
import axios from "src/configs/axios";

export default {
  login: (credentials) => axios.post("/users/login", credentials),
  register: (payload) => axios.post("/users/register", payload),
  refresh: (crendentials) =>
    axios.post("/refresh-tokens", {
      refresh_token: crendentials.refresh_token,
      email: crendentials.email,
    }),

  details: () => axios.get("/users"),
  update: (data) => axios.put("/users", data),
  logout: () => axios.post("/users/logout"),
};
