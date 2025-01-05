import axios from "axios";
import { convertParam, renderMessageError } from "@app/common/functionCommons";
import { convertCamelCaseToSnakeCase, convertSnakeCaseToCamelCase } from "@app/common/dataConverter";
import { API } from "@api";

export function createBase(api, data, loading = true) {
  const config = { loading };
  return axios
    .post(`${api}`, convertCamelCaseToSnakeCase(data), config)
    .then((response) => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data);
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}
export function postBaseNotNotifcation(api, data, loading = true) {
  const config = { loading };
  return axios
    .post(`${api}`, convertCamelCaseToSnakeCase(data), config)
    .then((response) => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data);
      return null;
    })
    .catch((err) => {
      return null;
    });
}
export function postRawData(api, data, loading = true) {
  const config = { loading };
  return axios
    .post(`${api}`, data, config)
    .then((response) => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data);
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}

export function getAllBase(api, query, loading = true) {
  const config = { loading };
  const params = convertParam(query);
  return axios
    .get(`${api}${params}`, config)
    .then((response) => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data);
      return null;
    })
    .catch(() => {
      return null;
    });
}

export function getAllPaginationBase(api, currentPage = 1, totalDocs = 0, query, loading = true) {
  const config = { loading };
  const params = convertParam(query, "&");
  return axios
    .get(`${api}?page=${currentPage}&limit=${totalDocs}${params}`, config)
    .then((response) => {
      if (response.status === 200) {
        if (totalDocs) {
          return convertSnakeCaseToCamelCase(response.data);
        } else {
          return convertSnakeCaseToCamelCase(response.data.docs);
        }
      }
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}
export function getAllPaginationBaseByID(api, id, currentPage = 1, totalDocs = 0, query, loading = true) {
  const config = { loading };
  const params = convertParam(query, "&");
  return axios
    .get(`${api}/${id}?page=${currentPage}&limit=${totalDocs}${params}`, config)
    .then((response) => {
      if (response.status === 200) {
        if (totalDocs) {
          return convertSnakeCaseToCamelCase(response.data);
        } else {
          return convertSnakeCaseToCamelCase(response.data.docs);
        }
      }
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}
export function getAllPaginationBaseByIDNotConvert(api, id, currentPage = 1, totalDocs = 0, query, loading = true) {
  const config = { loading };
  const params = convertParam(query, "&");
  return axios
    .get(`${api}/${id}?page=${currentPage}&limit=${totalDocs}${params}`, config)
    .then((response) => {
      if (response.status === 200) {
        if (totalDocs) {
          return response.data.docs;
        } else {
          return response.data.docs;
        }
      }
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}
export function getAllPaginationBaseByIDNotConvertParamsString(
  api,
  id,
  currentPage = 1,
  totalDocs = 0,
  query,
  loading = true
) {
  const config = { loading };
  if (query) query = "&" + query;
  return axios
    .get(`${api}/${id}?page=${currentPage}&limit=${totalDocs}${query}`, config)
    .then((response) => {
      if (response.status === 200) {
        if (totalDocs) {
          return response.data.docs;
        } else {
          return response.data.docs;
        }
      }
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}
export function getAllPaginationBaseParamsString(api, currentPage = 1, totalDocs = 0, params = "", loading = true) {
  const config = { loading };
  return axios
    .get(`${api}?page=${currentPage}&limit=${totalDocs}${params}`, config)
    .then((response) => {
      if (response.status === 200) {
        if (totalDocs) {
          return convertSnakeCaseToCamelCase(response.data);
        } else {
          return convertSnakeCaseToCamelCase(response.data.docs);
        }
      }
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}

export function getByIdBase(api, id, loading = true) {
  const config = { loading };
  return axios
    .get(api.format(id), config)
    .then((response) => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data);
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}
export function getByIdBaseNotToast(api, id, loading = true) {
  const config = { loading };
  return axios
    .get(api.format(id), config)
    .then((response) => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data);
      return null;
    })
    .catch((err) => {
      
      return null;
    });
}
export function getAllPaginationBaseByIDParamsString(
  api,
  id,
  currentPage = 1,
  totalDocs = 0,
  params = "",
  loading = true
) {
  const config = { loading };
  return axios
    .get(`${api}/${id}?page=${currentPage}&limit=${totalDocs}${params}`, config)
    .then((response) => {
      if (response.status === 200) {
        if (totalDocs) {
          return convertSnakeCaseToCamelCase(response.data);
        } else {
          return convertSnakeCaseToCamelCase(response.data.docs);
        }
      }
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}
export function getPaginationBase(api, id, currentPage = 1, totalDocs = 0, params = "", loading = true) {
  const config = { loading };
  return axios
    .get(`${api}/${id}?page=${currentPage}&limit=${totalDocs}${params}`, config)
    .then((response) => {
      if (response.status === 200) {
        return convertSnakeCaseToCamelCase(response.data);
      }
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}
export function updateBase(api, data, loading = true) {
  const config = { loading };
  return axios
    .put(api.format(data._id), convertCamelCaseToSnakeCase(data), config)
    .then((response) => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data);
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}
export function updateBaseFormatID(api, id, data, loading = true) {
  const config = { loading };
  return axios
    .put(api.format(id), convertCamelCaseToSnakeCase(data), config)
    .then((response) => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data);
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}

export function deleteByIdBase(api, id, loading = true) {
  const config = { loading };
  return axios
    .delete(api.format(id), config)
    .then((response) => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data);
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}
export function deleteBase(api, loading = true) {
  const config = { loading };
  return axios
    .delete(api, config)
    .then((response) => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data?.data);
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}
export function createBaseSnackCase(api, data, loading = true) {
  const config = { loading };
  return axios
    .post(`${api}`, convertSnakeCaseToCamelCase(data), config)
    .then((response) => {
      if (response.status === 200) return convertSnakeCaseToCamelCase(response?.data);
      return null;
    })
    .catch((err) => {
      renderMessageError(err);
      return null;
    });
}
export function getSimple(api, page, limit, query = "") {
  return axios
    .get(`${api.format(page, limit, query)}`)
    .then((res) => {
      return convertSnakeCaseToCamelCase(res?.data);
    })
    .catch((error) => {
      return null;
    });
}
export async function uploadImageArray(data, idForm) {
  let uploadPromises = data
    .filter((image) => image?.newUp === true)
    .map((image) => {
      let formData = new FormData();
      formData.append("image", image.url);
      formData.append(
        "jsonData",
        JSON.stringify({
          idForm,
          type: image.type,
        })
      );

      return axios.post(API.UPLOAD_IMAGE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    });

  const responses = await axios.all(uploadPromises);

  const responseData = responses.reduce((result, response, index) => {
    if (!response?.data) return;
    result[index] = response.data;
    return result;
  }, {});
  return responseData;
}
export function deleteImage(data) {
  const arrFile = [];
  for (let i = 0; i < data.length; i++) {
    let fileDelete = data[i].fileName;
    const itemFile = axios.delete(API.DELETE_IMAGE_FILENAME.format(fileDelete));
    arrFile.push(itemFile);
  }
  axios.all(arrFile);
}


