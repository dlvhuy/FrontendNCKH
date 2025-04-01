import { API } from "@api";
import { createBase, deleteByIdBase, getByIdBase, getSimple, updateBaseFormatID } from "../Base";

export function getAllStudent(page, limit, query) {
  return getSimple(API.GET_STUDENTS, page, limit, query);
}
export function createStudent(data) {
  return createBase(API.CREATE_STUDENT, data);
}
export function updateStudent(data) {
  return updateBaseFormatID(API.UPDATE_STUDENT, data.id, data);
}
export function deleteStudent(id) {
  return deleteByIdBase(API.DELETE_STUDENT, id);
}
export function getStudent(id){
    return getByIdBase(API.GET_STUDENT,id)
}