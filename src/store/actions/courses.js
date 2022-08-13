import {
  FETCH_COURSES,
  WATCH_COURSE,
  STATUS_COURSES,
  MESSAGE_COURSE,
} from "src/constans/types/courses";

export const statusCourses = (status) => ({
  type: STATUS_COURSES,
  payload: status,
});
export const fetchCourses = (fetch) => ({
  type: FETCH_COURSES,
  payload: fetch,
});
export const watchCourses = (watch) => ({
  type: WATCH_COURSE,
  payload: watch,
});
export const messageCourses = (message) => ({
  type: MESSAGE_COURSE,
  payload: message,
});
