import { loginApi } from "../Api/login";
import { getLoginRequest } from "../Requests/login";

export async function loginLogics(callback, payload = {}) {

  const request = getLoginRequest(payload);

  await loginApi(request)
    .then(response => {
      const { successCallback } = callback;
      const { successData, success } = response;

      successCallback(
        {
          data: successData.data,
          success
        }
      );
    })
    .catch(error => {
      const { errorCallback } = callback;
      const { errorData, success } = error;

      errorCallback( {
        error: errorData,
        success
      })
    });
}