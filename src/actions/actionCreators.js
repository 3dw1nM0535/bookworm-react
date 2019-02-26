import { USER_FETCHED } from "../types";

export const userFetched = user => ({
  type:USER_FETCHED,
  user
});
