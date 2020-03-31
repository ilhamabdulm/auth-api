const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

function sendEmail(userEmail, type, message) {
  const msg = {
    to: userEmail,
    from: "a.marzmellow21@gmail.com",
    subject: type,
    text: message,
    html: message
  };
  sgMail
    .send(msg)
    .then(response => {
      console.log("msg sent");
    })
    .catch(err => {
      console.log(err.response.body);
    });
}

module.exports = sendEmail;
