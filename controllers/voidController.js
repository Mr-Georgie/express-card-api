import fetch from "node-fetch";
import { flwCredentials, providerURL } from "../configs/general.config.js";
import db from "../models/index.js";
import { saveCardParamAfterVoid } from "../utils/cardParamHandler.js";
import fetchOptions from "../utils/fetchOptions.js";
import { formatVoidRequest } from "../utils/requestHandler.js";
import { updateTransaction } from "../utils/transactionHandler.js";
import voidRefundLogicController from "./voidRefundLogicController.js";

const provideAuthURL = providerURL.Void;
const { PaymentDealerAuthentication } = flwCredentials;
const Transaction = db.transactions;
const CardParam = db.cardParams;

const voidController = async (req, res) => {
  if (req.body.transactionReference === "null") {
    const message = JSON.stringify({
      message: "Failed: Please provide a transaction reference",
      code: "RR-04",
    });
    return res.status(400).send(message);
  }

  const refundOrVoid = await voidRefundLogicController(req, "refund");

  if (refundOrVoid !== "void") {
    if (refundOrVoid === "refund") {
      const message = JSON.stringify({
        message: "Failed: This transaction should be refunded",
        code: "RR-04",
      });
      return res.status(400).send(message);
    } else {
      return res.status(400).send(refundOrVoid);
    }
  }

  try {
    const { dataValues: authorizedCard } = await CardParam.findOne(
      {
        where: { tx_ref: req.body.transactionReference },
      },
      { raw: true }
    );

    const productRequest = formatVoidRequest(req);

    const providerPayload = {
      PaymentDealerAuthentication: PaymentDealerAuthentication,
      PaymentDealerRequest: { ...productRequest },
    };

    fetch(provideAuthURL, fetchOptions(providerPayload))
      .then((res) => res.json())
      .then(async (json) => {
        const { newCardParam, statusCode } = saveCardParamAfterVoid(
          authorizedCard,
          json,
          "void"
        );

        await CardParam.create(newCardParam);

        statusCode === 200
          ? updateTransaction(newCardParam, Transaction, "void")
          : null;

        res.status(statusCode).send(newCardParam.response);
      })
      .catch((error) => {
        const formattedError = JSON.stringify(error);
        res.status(400).send(formattedError);
      });
  } catch (error) {
    res.status(500).send("error " + error);
  }
};

export default voidController;
