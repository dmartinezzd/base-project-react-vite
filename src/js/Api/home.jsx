import { getAxiosResponse } from "./axiosResponse";

export async function homeApi(request) {

  const response = {
    success: false,
    successData: null,
    errorData: null
  };

  try {
    const axiosResponse = await getAxiosResponse(request);
    const { status, data } = axiosResponse;

    if (status === 200) {
      //transform
      const transformResponse = true;//homeTransform(data);

      if (transformResponse) {
        response.success = true;
        response.successData = data;

        return Promise.resolve(response);
      }
    } else {
      response.success = false;
      response.errorData = "Dió error";
    }

  } catch (ex) { }

  return Promise.reject(response);
}