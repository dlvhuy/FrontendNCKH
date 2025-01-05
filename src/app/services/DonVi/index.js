import { API } from "@api";
import { createBase, deleteByIdBase, getAllPaginationBaseParamsString, getSimple, updateBaseFormatID } from "../Base";

export function getAllDonVi(page, limit, query) {
  return getSimple(API.GET_ALL_ORG, page, limit, query);
}
export function createOrg(data) {
  return createBase(API.CREATE_ORG, data);
}
export function editOrg(data) {
  return updateBaseFormatID(API.EDIT_ORG, data.id, data);
}
export function deleteOrg(id) {
  return deleteByIdBase(API.DELETE_ORG, id);
}

