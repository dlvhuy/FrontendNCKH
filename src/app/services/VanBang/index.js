import { API } from "@api";
import { createBase, deleteByIdBase, getSimple, getSimpleXacnhan, getSSimple, updateBaseFormatID, updatepatchBaseFormatID } from "../Base";

export function getAllDegree(page, limit, query) {
  return getSimple(API.GET_ALL_DEGREE, page, limit, query);
}
export function createDegree(data) {
  return createBase(API.CREATE_NEW_DEGREE, data);
}
export function updateDegree(data) {
  return updateBaseFormatID(API.UPDATE_DEGREE, data.id, data);
}
export function deleteDegree(id) {
  return deleteByIdBase(API.DELETE_DEGREE, id);
}
export function AppproveDegree(id) {
  return updatepatchBaseFormatID(API.APPROVAL_DEGREE, id);
}
export function SignDegree(id) {
  return updatepatchBaseFormatID(API.SIGN_DEGREE, id);
}
export function getDegree(query){
  return getSSimple(API.SEARCH_DEGREE,query)
}
export function getDegreeXacnhan(id){
  return getSimpleXacnhan(API.XAC_NHAN,id)
}