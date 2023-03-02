const maskCardNumber = (cardNumber) => {
  return cardNumber.slice(0, 6) + "****" + cardNumber.slice(12, 16);
};

export default maskCardNumber;
