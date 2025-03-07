import { API } from "@api";
import { createBase, deleteByIdBase, getSimple, updateBaseFormatID } from "../Base";

export function getAllStudent(page, limit, query) {
  return getSimple(API.GET_PAGINATION_SINH_VIEN, page, limit, query);
}
export function createStudent(data) {
  return createBase(API.CREATE_SINH_VIEN, data);
}
export function updateStudent(data) {
  return updateBaseFormatID(API.UPDATE_SINH_VIEN, data.id, data);
}
export function deleteStudent(id) {
  return deleteByIdBase(API.DELETE_SINH_VIEN, id);
}