import { checkTxStatus, validateStatus } from "../utils/trxStatusLogic.js";
import { isUpTo24Hours } from "../utils/trxTimeChecker.js";

const voidRefundLogicController = async (req, method) => {
  const { status, transaction } = await checkTxStatus(req);

  const transactionTime = validateStatus(status, transaction);

  if (transactionTime) {
    if (isUpTo24Hours(transactionTime) && method !== "refund") {
      return "refund";
    } else {
      return "void";
    }
  } else {
    return JSON.stringify({
      message: `Failed: This transaction has been ${status}`,
      code: "RR-03",
    });
  }
};

export default voidRefundLogicController;
