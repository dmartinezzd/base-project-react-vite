import { helloWorldApi } from "../Api/helloWorld";
import { getHelloWorldRequest } from "../Requests/helloWorld";

export async function helloWorldLogic(callback, payload = {}) {
  const request = getHelloWorldRequest(payload);

  await helloWorldApi(request)
    .then(response => {
      const { successHelloWorldCallback } = callback;
      const { successData, success } = response;

      successHelloWorldCallback(
        {
          data: successData.data,
          success
        }
      );
    })
    .catch(error => {
      const { errorHelloWorldCallback } = callback;
      const { errorData, success } = error;

      errorHelloWorldCallback( {
        error: errorData,
        success
      })
    });
}
