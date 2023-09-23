const resController = (res, status, code, msg) => {
  return res.status(code).json({
    status: status,
    data: msg,
  });
};

module.exports = resController;
