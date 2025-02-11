export const API = {
  LOGIN: "/api/user/login",
  GET_MY_KEY: "/api/pki/getMyKey",
  MY_INFO: "/api/user/myInfo",
  UPDATE_MY_INFO: "/api/user/updateMyInfo",
  USER_CHANGE_PASSWORD: "/api/user/changePassword",
  PREVIEW_ID: "/api/images/{0}",
  UPDATE_KEY: "/api/pki/updateTitle/{0}",
  CREATE_KEY: "/api/pki/createNew",
  DELETE_KEY: "/api/pki/revoke",
  GET_ALL_ORG: "/api/org/getOrg?page={0}&limit={1}{2}",
  GET_ALL_USER: "/api/user/getUserPagination?page={0}&limit={1}{2}",
  CREATE_ORG: "/api/org/deleteOrg/{0}",
  EDIT_ORG: "/api/org/editOrg/{0}",
  CREATE_ORG: "/api/org/createNewOrg",
  DELETE_ORG: "/api/org/deleteOrg/{0}",
  CREATE_USER: "/api/user/register",
  UPDATE_USER: "/api/user/updateUser/{0}",
  DELETE_USER: "/api/user/deleteUser/{0}",
  CREATE_NEW_CAP_MOI: "/api/newcertificate/createNew",
  UPLOAD_IMAGE: "/api/media/create",
  DELETE_IMAGE_FILENAME: "/api/media/delete/{0}",
  GET_GIAY_TO_CAP_MOI: "/api/newcertificate/getCertificate/{0}",
  GET_BY_MA_GIAY_TO: "/api/newcertificate/getByCode/{0}",
  DELETE_GIAY_TO_CAP_MOI: "/api/newcertificate/deleteCertificate/{0}",
  GET_PAGINATION_GIAY_TO_CAP_MOI: "/api/newcertificate/getAllPagination?page={0}&limit={1}{2}",
  GET_PAGINATION_THAM_DINH_CAP_MOI: "/api/newcertificate/getCertificateThamDinh?page={0}&limit={1}{2}",
  GET_PAGINATION_THAM_DINH_CAP_LAI: "/api/reCertificate/getPaginationDepartment?page={0}&limit={1}{2}",
  GET_PAGINATION_THAM_DINH_CHUYEN_NHUONG: "/api/transfer/getTableChuyenNhuongDepartment?page={0}&limit={1}{2}",
  EDIT_CAP_MOI: "/api/newcertificate/editCertificate/{0}",
  CREATE_CHUYEN_NHUONG: "/api/transfer/create",
  EDIT_CHUYEN_NHUONG_BY_ID: "/api/transfer/editReCertificate/{0}",
  DELETE_CHUYEN_NHUONG_BY_ID: "/api/transfer/deleteReCeritificate/{0}",
  GET_PAGINATION_CHUYEN_NHUONG: "/api/transfer/getTableChuyenNhuong?page={0}&limit={1}{2}",
  GET_CHUYEN_NHUONG_BY_ID: "/api/transfer/getById/{0}",
  CREATE_NEW_RECERTIFICATE: "/api/reCertificate/create",
  GET_RECERTIFICATE_BY_ID: "/api/reCertificate/getById/{0}",
  DELETE_RECERTIFICATE_BY_ID: "/api/reCertificate/deleteById/{0}",
  EDIT_RECERTIFICATE_BY_ID: "/api/reCertificate/edit/{0}",
  GET_PAGINATION_GIAY_TO_CAP_LAI: "/api/reCertificate/getPagination?page={0}&limit={1}{2}",
  SEND_NEWCERTIFICATE_TO_ORG: "/api/newcertificate/sendCertificateToOrg/{0}",
  SEND_TRANSFER_TO_ORG: "/api/transfer/sendCertificateToOrg/{0}",
  SEND_RECERTIFICATE_TO_ORG: "/api/reCertificate/sendCertificateToOrg/{0}",
  SEND_RESULT_THAM_DINH_NEW_CERTIFICATE_TO_ORG: "/api/newcertificate/sendResultThamDinh/{0}",
  SEND_RESULT_THAM_DINH_RECERTIFICATE_TO_ORG: "/api/reCertificate/sendResultToUser/{0}",
  SEND_RESULT_CAP_LAI_TO_ORG: "/api/transfer/sendResultToOrg/{0}",
  GET_LAND: "/api/land/getLand/{0}",
  CREATE_NEW_DEGREE:"/api/degree/create",
  UPDATE_DEGREE:"/api/degree/updateDegree/{0}",
  GET_ALL_DEGREE:"/api/degree/getAllDegree?page={0}&limit={1}{2}",
  DELETE_DEGREE:"/api/degree/deleteDegree/{0}"
};

