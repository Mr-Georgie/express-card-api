import fetch from "node-fetch";
import { appCredentials, providerURL } from "../configs/general.config.js";
import db from "../models/index.js";
import { saveCardParamAfterCapture } from "../utils/cardParamHandler.js";
import fetchOptions from "../utils/fetchOptions.js";
import { formatCaptureRequest } from "../utils/requestHandler.js";
import { updateTransaction } from "../utils/transactionHandler.js";

const provideAuthURL = providerURL.Capture;
const { PaymentDealerAuthentication } = appCredentials;
const Transaction = db.transactions;
const CardParam = db.cardParams;

const captureController = async (req, res) => {
  try {
    const { dataValues: authorizedCard } = await CardParam.findOne(
      {
        where: { tx_ref: req.body.transactionReference },
      },
      { raw: true }
    );

    const productRequest = formatCaptureRequest(req);

    const providerPayload = {
      PaymentDealerAuthentication: PaymentDealerAuthentication,
      PaymentDealerRequest: { ...productRequest },
    };

    fetch(provideAuthURL, fetchOptions(providerPayload))
      .then((res) => res.json())
      .then(async (json) => {
        const { newCardParam, statusCode } = saveCardParamAfterCapture(
          authorizedCard,
          json,
          "capture"
        );

        await CardParam.create(newCardParam);

        statusCode === 200
          ? updateTransaction(newCardParam, Transaction)
          : null;

        res.status(statusCode).send(newCardParam.response);
      })
      .catch((error) => {
        const formattedError = JSON.stringify(error);
        res.status(400).send(formattedError);
      });
  } catch (error) {
    res.status(500).send("Transaction not found " + error);
  }
};

export default captureController;
