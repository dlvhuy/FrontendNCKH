import { API } from "@api";
import { createBase, deleteBase, getAllBase, updateBase, updateBaseFormatID } from "../Base";

export function getMyKey() {
  return getAllBase(API.GET_MY_KEY);
}
export function updateTitleKey(title) {
  return updateBase(API.UPDATE_KEY, title);
}
export function createKeyBase(password) {
  return createBase(API.CREATE_KEY, password);
}
export function deleteKeyBase() {
  return deleteBase(API.DELETE_KEY);
}

