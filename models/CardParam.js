const CardParamModel = (sequelize, Sequelize) => {
  const CardParam = sequelize.define(
    "card_params",
    {
      tx_ref: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      external_ref: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      method: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      body: {
        type: Sequelize.STRING(1234),
        allowNull: false,
      },
      time_in: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      response: {
        type: Sequelize.STRING(1234),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return CardParam;
};

export default CardParamModel;
