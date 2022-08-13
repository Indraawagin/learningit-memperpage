/* eslint-disable import/no-anonymous-default-export */
import axios from "src/configs/axios";
export default {
  upload: (image) => axios.post(`/media`, { image }),
};
