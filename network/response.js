const successResponse = (res, message, status) => {
  res.status(status || 200).send({
    error: "",
    body: message,
  });
};

const errorResponse = (res, status, error) => {
  console.log("[responseError] ", error);
  res.status(status || 500).send({
    error,
    body: "",
  });
};

module.exports = { successResponse, errorResponse };
