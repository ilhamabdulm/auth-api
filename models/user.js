const { model, Schema } = require("mongoose");
const { hashPassword } = require("../helpers/bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email has been registered"],
    validate: [
      {
        validator: function(value) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        },
        message: "Invalid email format, please check your email"
      }
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be 6 character or more"]
  },
  otp: {
    type: Number
  }
});

userSchema.pre("save", function(next) {
  const hash = hashPassword(this.password);
  this.password = hash;
  next();
});

const User = model("User", userSchema);

module.exports = User;
