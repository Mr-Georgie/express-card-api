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
    time_in: dateTime(),
    time_out: dateTime(),
    response_message: "Transaction Authorized",
    response_code: "00",
  };
};

const updateTransaction = (cardParam, transactionInstance, isVoided) => {
  transactionInstance.update(
    {
      response_message: isVoided
        ? "Transaction Voided"
        : "Transaction Captured",
      time_out: dateTime(),
    },
    {
      where: {
        tx_ref: cardParam.tx_ref,
      },
    }
  );
};

export { saveTransaction, updateTransaction };
