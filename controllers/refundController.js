import fetch from "node-fetch";
import { flwCredentials, providerURL } from "../configs/general.config.js";
import fetchOptions from "../utils/fetchOptions.js";
import { formatRefundRequest } from "../utils/requestHandler.js";
import voidRefundLogicController from "./voidRefundLogicController.js";

const provideAuthURL = providerURL.Refund;
const { PaymentDealerAuthentication } = flwCredentials;

const refundController = async (req, res) => {
  if (req.body.transactionReference === "null") {
    const message = JSON.stringify({
      message: "Failed: Please provide a transaction reference",
      code: "RR-04",
    });
    return res.status(400).send(message);
  }

  const refundOrVoid = await voidRefundLogicController(req, "refund");

  if (refundOrVoid !== "refund") {
    if (refundOrVoid === "void") {
      const message = JSON.stringify({
        message: "Failed: This transaction should be voided",
        code: "RR-04",
      });
      return res.status(400).send(message);
    } else {
      return res.status(400).send(refundOrVoid);
    }
  }

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
