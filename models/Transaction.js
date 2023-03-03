const TransactionModel = (sequelize, Sequelize) => {
  const Transaction = sequelize.define(
    "transactions",
    {
      tx_ref: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      provider: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      card_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      narration: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mask: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      time_authorized: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      time_captured: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      time_voided: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      time_refunded: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      tx_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      response_message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      response_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Transaction;
};

export default TransactionModel;
