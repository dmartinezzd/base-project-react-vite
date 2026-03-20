import axios from "axios";

export function getAxiosResponse(request) {
  return axios(request)
    .then(response => response)
    .catch(error => {
      if (axios.isCancel(error)) {
        throw "cancelled";
      } else if (error.response) {
        return error.response;
      }

      throw "network error";
    })
}