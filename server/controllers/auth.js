import User from "../models/user";

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
