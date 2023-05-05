/* single response handler to ensure consistent responses */
const sendResponse = (res, statusCode, data, message) => {
  const response = {
    status: statusCode,
    message,
    data,
  };
  res.status(statusCode).json(response);
};

export { sendResponse };
