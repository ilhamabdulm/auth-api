module.exports = (err, req, res, next) => {
  let code = 500;
  let message = "Internal server error";

  if (err.errCode) {
    code = err.errCode;
    message = err.msg;
  }
  console.log(err);
  res.status(code).json({
    code,
    message
  });
};
