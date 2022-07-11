import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: "Name is required.",
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: "Email is required.",
    },
    password: {
      type: String,
      trim: true,
      min: 6,
      max: 64,
    },
    stripe_accound_id: "",
    stripe_seller: {},
    stripeSession: {},
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    return bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) {
        console.log("BCRYPT_HASH_ERROR ", err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, res) {
    if (err) {
      console.log("COMPARE PASSWORD ERROR", err);
      return next(err, false);
    }
    console.log("MATCH PASSWORD", res);
    return next(null, res);
  });
};

export default mongoose.model("User", userSchema);
