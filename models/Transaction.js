const TransactionModel = (sequelize, Sequelize) => {
  const Transaction = sequelize.define(
    "transactions_g",
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
      time_in: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      time_out: {
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
