import dateTime from "./formatDate.js";
import maskCardNumber from "./maskCardNumber.js";
import { failedResponse, successfulResponse } from "./responseHandler.js";

const saveCardParamBeforeAuth = (request, method) => {
  const getRequest = request;
  getRequest.body.cardNo = maskCardNumber(request.body.cardNo);
  getRequest.body.cvv = null;

  return {
    tx_ref: getRequest.body.transactionReference,
    external_ref: getRequest.body.externalReference,
    body: JSON.stringify(getRequest.body),
    method: method,
    time_in: dateTime(),
    response: JSON.stringify({
      message: "Pending",
      code: "02",
      tx_ref: getRequest.body.transactionReference,
      providerResponse: {},
      provider: "MOKA",
    }),
  };
};

const saveCardParamAfterAuth = (cardParam, providerResponse) => {
  const errorOccurred = !providerResponse.Data;

  const response = errorOccurred
    ? failedResponse(providerResponse, cardParam.tx_ref)
    : successfulResponse(providerResponse, cardParam.tx_ref);

  const statusCode = errorOccurred ? 400 : 200;

  cardParam.response = response;

  cardParam.external_ref = errorOccurred
    ? cardParam.external_ref
    : providerResponse.Data.VirtualPosOrderId;

  cardParam.time_in = dateTime();
  return { cardParam, statusCode };
};

const saveCardParamAfterCapture = (cardParam, providerResponse, method) => {
  const errorOccurred = !providerResponse.Data;

  const response = errorOccurred
    ? failedResponse(providerResponse, cardParam.tx_ref)
    : successfulResponse(providerResponse, cardParam.tx_ref);

  cardParam.external_ref = errorOccurred
    ? cardParam.external_ref
    : providerResponse.Data.VirtualPosOrderId;

  const statusCode = errorOccurred ? 400 : 200;

  const newCardParam = {
    tx_ref: cardParam.tx_ref,
    external_ref: cardParam.external_ref,
    body: cardParam.body,
    method: method,
    time_in: dateTime(),
    response: response,
  };

  return { newCardParam, statusCode };
};

const saveCardParamAfterVoid = (cardParam, providerResponse, method) => {
  const errorOccurred = !providerResponse.Data;

  const response = errorOccurred
    ? failedResponse(providerResponse, cardParam.tx_ref)
    : successfulResponse(providerResponse, cardParam.tx_ref);

  cardParam.external_ref = errorOccurred
    ? cardParam.external_ref
    : providerResponse.Data.VirtualPosOrderId;

  const statusCode = errorOccurred ? 400 : 200;

  const newCardParam = {
    tx_ref: cardParam.tx_ref,
    external_ref: cardParam.external_ref,
    body: cardParam.body,
    method: method,
    time_in: dateTime(),
    response: response,
  };

  return { newCardParam, statusCode };
};

export {
  saveCardParamBeforeAuth,
  saveCardParamAfterAuth,
  saveCardParamAfterCapture,
  saveCardParamAfterVoid,
};
