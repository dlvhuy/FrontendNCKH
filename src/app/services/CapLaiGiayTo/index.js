import { API } from "@api";
import { createBase, deleteByIdBase, getByIdBase, getSimple, updateBaseFormatID } from "../Base";

export const createNewCapLai = (e) => {
  return createBase(API.CREATE_NEW_RECERTIFICATE, e);
};
export const getReCertificateById = (id) => {
  return getByIdBase(API.GET_RECERTIFICATE_BY_ID, id);
};
export const deleteReCertificateByID = (id) => {
  return deleteByIdBase(API.DELETE_RECERTIFICATE_BY_ID, id);
};
export const editReCertificate = (id, data) => {
  return updateBaseFormatID(API.EDIT_RECERTIFICATE_BY_ID, id, data);
};
export const getTableReCertificate = (page, limit, query) => {
  return getSimple(API.GET_PAGINATION_GIAY_TO_CAP_LAI, page, limit, query);
};
export const sendReCertificateToOrg = (id, privateKey, orgCurrent) => {
  return updateBaseFormatID(API.SEND_RECERTIFICATE_TO_ORG, id, { privateKey, orgCurrent });
};
export const getTableReCertificateDepartment = (page, limit, query) => {
  return getSimple(API.GET_PAGINATION_THAM_DINH_CAP_LAI, page, limit, query);
};

export const sendResultReCertificateToOrg = (id, data) => {
  return updateBaseFormatID(API.SEND_RESULT_THAM_DINH_RECERTIFICATE_TO_ORG, id, data);
};


