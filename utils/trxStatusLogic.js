import db from "../models/index.js";

const Transaction = db.transactions;

const checkTxStatus = async (req) => {
  const transaction = await Transaction.findOne(
    {
      where: { tx_ref: req.body.transactionReference },
    },
    { raw: true }
  );

  const status = transaction.tx_status;

  return { status, transaction };
};

const validateStatus = (status, transaction) => {
  if (status === "Authorized") {
    return transaction.time_authorized;
  } else if (status === "Captured") {
    return transaction.time_captured;
  } else {
    return null;
  }
};

export { checkTxStatus, validateStatus };
