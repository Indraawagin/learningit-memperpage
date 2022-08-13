import { toast } from "react-toastify";
import users from "src/constans/api/users";
import axios, { setAuthorizationHeader } from "./index";

function errorHandler(error) {
  if (error) {
    let message;
    if (error.response) {
      const originalRequest = error.config;
      if (error.response.status === 500) message = "Someting went terribly wrong";
      else if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const session = localStorage["LEARNINGIT:token"]
          ? JSON.parse(localStorage["LEARNINGIT:token"])
          : null;
        return users
          .refresh({ refresh_token: session.refresh_token, email: session.email })
          .then((res) => {
            if (res.data) {
              setAuthorizationHeader(res.data.token);
              localStorage.setItem(
                "LEARNINGIT:token",
                JSON.stringify({
                  ...session,
                  token: res.data.token,
                })
              );
              originalRequest.headers.authorization = res.data.token;
              return axios(originalRequest);
            } else {
              window.location.href = "/login";
              localStorage.removeItem("LEARNINGIT:token");
            }
          });
      } else message = error.response.data.message;

      if (typeof message === "string") toast.error(message);
      return Promise.reject(error);
    }
  }
}

export default errorHandler;
