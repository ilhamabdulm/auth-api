const User = require("../models/user");
const { generateToken } = require("../helpers/jwt");
const { comparePass, hashPassword } = require("../helpers/bcrypt");
const generateNumber = require("../helpers/generateNumber");
const sendEmail = require("../helpers/sendgrid");
const randomPassword = require("../helpers/randomPassword");

class UserController {
  static register(req, res, next) {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    User.create(userData)
      .then(result => {
        res.status(201).json({
          userData: result,
          message: "Registration Success",
          status: 201
        });
      })
      .catch(next);
  }

  static login(req, res, next) {
    const userData = {
      email: req.body.email,
      password: req.body.password
    };
    let otp;

    User.findOne({ email: userData.email })
      .then(result => {
        if (!result) {
          throw { errCode: 401, msg: "Invalid email/password" };
        } else {
          const compare = comparePass(userData.password, result.password);
          if (!compare) {
            throw { errCode: 401, msg: "Invalid email/password" };
          } else {
            const data = {
              otp: generateNumber()
            };
            otp = data.otp;
            return User.findByIdAndUpdate(result._id, data);
          }
        }
      })
      .then(response => {
        sendEmail(
          response.email,
          "Login verification code",
          `Here is your login verification code: ${otp}, please take care it carefully`
        );
        res.status(200).json({
          message: "Please check your email to get your login code",
          status: 200
        });
      })
      .catch(next);
  }

  static verifyCode(req, res, next) {
    const otp = req.body.code;
    const userId = req.params.id;
    User.findOne({ _id: userId })
      .then(result => {
        if (!result) {
          throw { errCode: 404, msg: "User not found!" };
        }
        if (result.otp === Number(otp)) {
          return User.findByIdAndUpdate(result._id, { otp: null });
        } else {
          throw {
            errCode: 403,
            msg: "You are not authorized / code is invalid"
          };
        }
      })
      .then(response => {
        const token = generateToken({
          _id: response._id,
          email: response.email
        });
        res.status(200).json({
          message: "Verification success, Logged in",
          status: 200,
          token
        });
      })
      .catch(next);
  }

  static resetPassword(req, res, next) {
    const email = req.body.email;
    const newPassword = randomPassword();
    User.findOneAndUpdate(
      { email: email },
      { password: hashPassword(newPassword) }
    )
      .then(result => {
        if (!result) {
          throw { errCode: 404, msg: "User not found!" };
        }
        sendEmail(
          email,
          "Reset Password",
          `Here is your new password: ${newPassword}`
        );
        res.status(200).json({
          message:
            "Password has been reset, please check your email to get your new Password",
          status: 200
        });
      })
      .catch(next);
  }
}

module.exports = UserController;
