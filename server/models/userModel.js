const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  pfp: { type: String, default: undefined },
  email: { type: String, unique: true },
  password: { type: String, minlength: 8 },
  facebookId: { type: String },
  verified: { type: Boolean },
});


userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
