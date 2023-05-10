const failResponse = (data: { message: string }) => {
  const { message } = data;
  return {
    status: false,
    message,
  };
};

const successResponse = (data: { message: string; payload: any }) => {
  const { message, payload } = data;
  return {
    status: true,
    message,
    payload,
  };
};

export { failResponse, successResponse };
