/* eslint-disable import/no-anonymous-default-export */
import { POPULATE_PROFILE } from "src/constans/types/users";

const initialState = null;

export default function (state = initialState, props) {
  switch (props.type) {
    case POPULATE_PROFILE:
      return props.payload;
    default:
      return state;
  }
}
