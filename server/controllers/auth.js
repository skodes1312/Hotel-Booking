import User from "../models/user";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log(req.body);
  let { name, email, password } = req.body;
  if (!name) return res.status(400).send("Name field can not be left empty.");
  if (!password || password.length < 6)
    return res
      .status(400)
      .send(
        "Password is required and must contain at least 6 or more characters"
      );
  if (!email) return res.status(400).send("Email field can not be left empty.");
  let emailExists = await User.findOne({ email: email }).exec();
  if (emailExists) {
    return res.status(400).send("Email already exists");
  }
  const user = new User(req.body);
  try {
    await user.save();
    console.log("User created.", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log("Create User Failed", err);
    return res.status(400).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("Email address is not registered.");
    user.comparePassword(password, (err, match) => {
      if (!match || err) return res.status(400).send("Password is incorrect.");

      //GENERATE A TOKEN AND THEN SEND AS RESPONSE TO CLIENT
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
      });
      res.json({
        token,
        user: {
          _id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller,
          stripeSession: user.stripeSession,
        },
      });
    });
  } catch (err) {
    console.log("LOGIN ERROR", err);
    return res.status(400).send("Signin Failed.");
  }
};
