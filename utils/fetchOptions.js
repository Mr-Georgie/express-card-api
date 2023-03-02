const fetchOptions = (requestBody) => {
  return {
    method: "post",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export default fetchOptions;
