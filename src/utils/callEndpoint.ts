import axios, {AxiosPromise, AxiosRequestConfig} from "axios";
import {HEADER_NAME_ERROR_RELAY_VERSION} from "./headers";
import ErrorRelayException from "../exception/ErrorRelayException";
import HttpResponseException from "../exception/HttpResponseException";

const callEndpoint = <ReturnType>(
  axiosRequestConfig: AxiosRequestConfig,
  acceptedResponseStatuses: number[] = [200]
): AxiosPromise<ReturnType> => {
  axiosRequestConfig.validateStatus = (status) => true;

  const axiosPromise: AxiosPromise<ReturnType> = axios(axiosRequestConfig);

  return axiosPromise
    .catch((err) => {
      throw err;
    })
    .then((response) => {
      const errorRelayVersionHeader = response.headers[HEADER_NAME_ERROR_RELAY_VERSION];

      if (errorRelayVersionHeader !== undefined) {
        throw new ErrorRelayException(
          response.status,
          errorRelayVersionHeader,
          response.data
        );
      }

      if (!acceptedResponseStatuses.includes(response.status)) {
        throw new HttpResponseException(
          "callEndpoint HTTP response code is " + response.status,
          response.status,
          response.data
        )
      }

      return response;
    });
};

export default callEndpoint;
