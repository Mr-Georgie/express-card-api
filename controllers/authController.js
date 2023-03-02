import fetch from "node-fetch";
import { flwCredentials, providerURL } from "../configs/general.config.js";
import db from "../models/index.js";
import {
  saveCardParamAfterAuth,
  saveCardParamBeforeAuth,
} from "../utils/cardParamHandler.js";
import fetchOptions from "../utils/fetchOptions.js";
import dateTime from "../utils/formatDate.js";
import { formatAuthRequest } from "../utils/requestHandler.js";
import { unexpectedErrorResponse } from "../utils/responseHandler.js";
import { saveTransaction } from "../utils/transactionHandler.js";

const providerAuthURL = providerURL.Auth;
const { PaymentDealerAuthentication, PaymentDealerRequest } = flwCredentials;
const CardParam = db.cardParams;
const Transaction = db.transactions;

const authController = async (req, res) => {
  const productRequest = formatAuthRequest(req);

  const providerPayload = {
    PaymentDealerAuthentication: PaymentDealerAuthentication,
    PaymentDealerRequest: { ...productRequest, ...PaymentDealerRequest },
  };

  const cardParam = saveCardParamBeforeAuth(req, "authorize");

  try {
    await CardParam.create(cardParam);

    fetch(providerAuthURL, fetchOptions(providerPayload))
      .then((res) => res.json())
      .then(async (json) => {
        const { cardParam: newCardParam, statusCode } = saveCardParamAfterAuth(
          cardParam,
          json
        );

        await CardParam.create(newCardParam);

        const saveAuthorizedTransaction =
          statusCode === 200 ? saveTransaction(cardParam) : null;

        saveAuthorizedTransaction
          ? await Transaction.create(saveAuthorizedTransaction)
          : null;

        res.status(statusCode).send(newCardParam.response);
      })
      .catch(async (error) => {
        cardParam.response = unexpectedErrorResponse(error);
        cardParam.time_in = dateTime();

        await CardParam.create(cardParam);

        res.status(500).send(cardParam.response);
      });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while adding the card parameter to db",
    });
  }
};

export default authController;
