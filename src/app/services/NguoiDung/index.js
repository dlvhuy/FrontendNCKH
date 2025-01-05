import { API } from "@api";
import { createBase, deleteByIdBase, getSimple, updateBaseFormatID } from "../Base";

export function getAllUser(page, limit, query) {
  return getSimple(API.GET_ALL_USER, page, limit, query);
}
export function createUser(data) {
  return createBase(API.CREATE_USER, data);
}
export function updateUser(data) {
  return updateBaseFormatID(API.UPDATE_USER, data.id, data);
}
export function deleteUser(id) {
  return deleteByIdBase(API.DELETE_USER, id);
}