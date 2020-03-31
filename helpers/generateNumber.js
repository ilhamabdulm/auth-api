function generateNumber() {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 9) + 1;
  }
  return Number(otp);
}

module.exports = generateNumber;
