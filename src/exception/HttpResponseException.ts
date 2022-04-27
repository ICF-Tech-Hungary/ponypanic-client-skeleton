export default class HttpResponseException extends Error {
  responseStatus: number;
  responseBody: any;

  constructor(
    message: string,
    responseStatus: number,
    responseBody: Record<string, any>,
  ) {
    super(message)
    this.responseStatus = responseStatus;
    this.responseBody = responseBody;
  }
}
