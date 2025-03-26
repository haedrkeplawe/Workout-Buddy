const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (name, email, password) {
  if (!name || !email || !password) {
    throw Error("All fileds are required");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("email aready in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(password, salt);
  const user = await this.create({ name, email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fileds are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Encorrect email");
  }

  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    throw Error("Encorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
