import { homeApi } from "../Api/home";
import { getHomeRequest } from "../Requests/home";

export async function homeLogics(callback, payload = {}) {
  const request = getHomeRequest(payload);

  await homeApi(request)
    .then(response => {
      const { successCallback } = callback;
      const { successData, success } = response;

      successCallback(
        {
          data: successData[0],
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
