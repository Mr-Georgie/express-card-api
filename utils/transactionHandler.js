import dateTime from "./formatDate.js";

const saveTransaction = (cardParam) => {
  const cardParamBody = JSON.parse(cardParam.body);

  return {
    tx_ref: cardParamBody.transactionReference,
    email: cardParamBody.email,
    amount: cardParamBody.amount,
    provider: cardParamBody.provider,
    currency: cardParamBody.currency,
    card_number: cardParamBody.cardNo,
    country: cardParamBody.country,
    narration: cardParamBody.narration,
    mask: cardParamBody.cardNo,
    time_authorized: dateTime(),
    tx_status: "Authorized",
    time_in: dateTime(),
    time_out: dateTime(),
    response_message: "Successful",
    response_code: "00",
  };
};

const updateTransaction = (cardParam, transactionInstance, method) => {
  if (method === "capture") {
    transactionInstance.update(
      {
        response_message: "Successful",
        time_captured: dateTime(),
        tx_status: "Captured"
      },
      {
        where: {
          tx_ref: cardParam.tx_ref,
        },
      }
    );
  }

  if (method === "void") {
    transactionInstance.update(
      {
        response_message: "Successful",
        time_voided: dateTime(),
        tx_status: "Voided",
      },
      {
        where: {
          tx_ref: cardParam.tx_ref,
        },
      }
    );
  }

  if (method === "refund") {
    transactionInstance.update(
      {
        response_message: "Successful",
        time_refunded: dateTime(),
        tx_status: "Refunded",
      },
      {
        where: {
          tx_ref: cardParam.tx_ref,
        },
      }
    );
  }
};

export { saveTransaction, updateTransaction };
