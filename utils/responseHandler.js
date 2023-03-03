const unexpectedErrorResponse = (error) => {
  return {
    message: "Failed: Unexpected provider error",
    code: "RR",
    providerResponse: JSON.stringify(error),
    provider: "MOKA",
  };
};

const successfulResponse = (providerResponse, transactionReference) => {
  return JSON.stringify({
    message: "Successful",
    code: "00",
    tx_ref: transactionReference,
    providerResponse: providerResponse ? providerResponse : {},
    provider: "MOKA",
  });
};

const failedResponse = (providerResponse, transactionReference, message) => {
  return JSON.stringify({
    message: message
      ? message
      : "Failed: Check provider response for more details",
    code: "RR-01",
    tx_ref: transactionReference,
    providerResponse: providerResponse ? providerResponse : {},
    provider: "MOKA",
  });
};

export { unexpectedErrorResponse, successfulResponse, failedResponse };
