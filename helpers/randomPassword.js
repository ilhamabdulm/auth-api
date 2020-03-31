function randomPassword() {
  let random = "";
  for (let i = 0; i < 5; i++) {
    if (i % 2 === 0) {
      random +=
        String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65)) +
        Math.floor(Math.random() * 9);
    } else {
      random +=
        String.fromCharCode(Math.floor(Math.random() * (122 - 97) + 97)) +
        Math.floor(Math.random() * 9);
    }
  }
  return random;
}

module.exports = randomPassword;
