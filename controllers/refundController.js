import fetch from "node-fetch";
import { flwCredentials, providerURL } from "../configs/general.config.js";
import fetchOptions from "../utils/fetchOptions.js";
import { formatRefundRequest } from "../utils/requestHandler.js";

const provideAuthURL = providerURL.Refund;
const { PaymentDealerAuthentication } = flwCredentials;

const refundController = async (req, res) => {
  const productRequest = formatRefundRequest(req);

  const providerPayload = {
    PaymentDealerAuthentication: PaymentDealerAuthentication,
    PaymentDealerRequest: { ...productRequest },
  };

  fetch(provideAuthURL, fetchOptions(providerPayload))
    .then((res) => res.json())
    .then((json) => {
      const formattedResponse = JSON.stringify(json);
      res.status(200).send(formattedResponse);
    })
    .catch((error) => {
      const formattedError = JSON.stringify(error);
      res.status(400).send(formattedError);
    });
};

export default refundController;
