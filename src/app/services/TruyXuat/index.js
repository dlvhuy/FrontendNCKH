import { API } from "@api";
import { getByIdBase, getByIdBaseNotToast } from "../Base";

export const getLand = (id) => {
  return getByIdBaseNotToast(API.GET_LAND, id);
};
