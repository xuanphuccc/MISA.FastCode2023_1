export function success(res) {
  return {
    success: true,
    statusCode: res.status,
    data: res.data,
  };
}

export function failure(res) {
  return {
    success: false,
    statusCode: res.status,
    data: res.data,
    devMsg: res.data.devMsg,
    userMsg: res.data.userMsg,
  };
}
