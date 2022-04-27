export default class ErrorRelayException extends Error {
  responseStatus: number;
  version: string;
  responseBody: any;
  categoryId: number;
  subId: number;
  timestamp: any;
  payload: any;
  payloadSerializationError: boolean

  constructor(
    responseStatus: number,
    version: string,
    responseBody: Record<string, any>,
  ) {
    super(responseBody['message']);

    this.responseStatus = responseStatus;
    this.version = version;
    this.responseBody = responseBody;

    this.categoryId = Number.parseInt(responseBody['categoryId']);
    this.subId = Number.parseInt(responseBody['subId']);

    this.timestamp = responseBody['timestamp'];
    this.payload = responseBody['payload'];

    this.payloadSerializationError = ['true', 'TRUE'].includes(responseBody['payloadSerializationError'])
      || responseBody['payloadSerializationError'] === true;
  }
}
