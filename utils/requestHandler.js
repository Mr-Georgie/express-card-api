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
    VirtualPosOrderId: request.body.orderId,
    Amount: request.body.amount,
    OtherTrxCode: request.body.transactionReference,
    ClientIP: request.body.customerIp,
  };
};

const formatVoidRequest = (request) => {
  return {
    VirtualPosOrderId: request.body.orderId,
    VoidRefundReason: request.body.voidRefundReason,
    OtherTrxCode: request.body.transactionReference,
    ClientIP: request.body.customerIp,
  };
};

const formatRefundRequest = (request) => {
  return {
    VirtualPosOrderId: request.body.orderId,
    Amount: request.body.amount,
    OtherTrxCode: request.body.transactionReference,
  };
};

export {
  formatAuthRequest,
  formatCaptureRequest,
  formatVoidRequest,
  formatRefundRequest,
};
