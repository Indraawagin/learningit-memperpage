import { POPULATE_PROFILE } from "src/constans/types/users";

export const populateProfile = (profile = {}) => ({
  type: POPULATE_PROFILE,
  payload: profile,
});
