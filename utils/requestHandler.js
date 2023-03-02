const formatAuthRequest = (request) => {
  return {
    CardNumber: request.body.cardNo,
    ExpMonth: request.body.expiryMonth,
    ExpYear: request.body.expiryYear,
    CvcNumber: request.body.cvv,
    Amount: request.body.amount,
    Currency: request.body.currency,
    OtherTrxCode: request.body.transactionReference,
    ClientIP: request.body.customerIp,
  };
};

const formatCaptureRequest = (request) => {
  return {
    VirtualPosOrderId: "",
    Amount: request.body.amount,
    OtherTrxCode: request.body.transactionReference,
    ClientIP: request.body.customerIp,
  };
};

const formatVoidRequest = (request) => {
  return {
    VirtualPosOrderId: "",
    VoidRefundReason: request.body.voidRefundReason,
    OtherTrxCode: request.body.transactionReference,
    ClientIP: request.body.customerIp,
  };
};

export { formatAuthRequest, formatCaptureRequest, formatVoidRequest };
