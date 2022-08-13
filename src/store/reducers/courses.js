/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable default-case */
import {
  FETCH_COURSES,
  WATCH_COURSE,
  STATUS_COURSES,
  MESSAGE_COURSE,
} from "src/constans/types/courses";

const initialState = {
  data: {},
  total: 0,
  status: "idle",
  message: "",
};

export default function (state = initialState, props) {
  switch (props.type) {
    case STATUS_COURSES:
      return {
        ...state,
        status: props.payload,
      };
    case FETCH_COURSES:
      return {
        ...state,
        data: props.payload?.reduce?.((acc, item) => {
          acc[item.course_id] = item;
          return acc;
        }, {}),
        total: props.payload.length ?? 0,
        status: "ok",
      };
    case MESSAGE_COURSE:
      return {
        ...state,
        message: props.payload,
        status: "error",
      };

    case WATCH_COURSE:
      return {
        ...state,
        data: {
          ...state.data,
          [props.payload.id]: {
            ...state.data[props.payload.id],
            ...props.payload,
          },
        },
        status: "ok",
      };

    default:
      return state;
  }
}
