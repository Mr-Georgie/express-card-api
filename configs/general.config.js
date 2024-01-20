import env from "./env.config.js";

const appCredentials = {
  PaymentDealerAuthentication: {
    DealerCode: env.DEALERCODE,
    Username: env.USERNAME,
    Password: env.PASSWORD,
    CheckKey: env.CHECKKEY,
  },
  PaymentDealerRequest: {
    IsPoolPayment: 0,
    IsTokenized: 0,
    Software: "Possimulation",
    IsPreAuth: 1,
  },
};

const providerURL = {
  Auth: "https://service.refmoka.com/PaymentDealer/DoDirectPayment",
  Capture: "https://service.refmoka.com/PaymentDealer/DoCapture",
  Refund: "https://service.refmoka.com/PaymentDealer/DoCreateRefundRequest",
  Void: "https://service.refmoka.com/PaymentDealer/DoVoid",
};

export { appCredentials, providerURL };
