import Stripe from "stripe";
import User from "../models/user";
import queryString from "query-string";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
export const createConnectAccount = async (req, res) => {
  // creating account id if user don't have it
  const user = await User.findById(req.auth._id).exec();
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: "express",
    });
    user.stripe_account_id = account.id;
    user.save();

    console.log("Stripe Connect account id => ", user.stripe_account_id);
  }

  // creating an account login link by calling the Account Links API
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });

  //prefilling user info
  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });

  // console.log("ACCOUNT LINK ==> ", accountLink);

  let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  console.log(link);
  res.send(link);
};

const updateDelayDays = async (accountId) => {
  const account = await stripe.accounts.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 7,
        },
      },
    },
  });
  return account;
};

export const getAccStatus = async (req, res) => {
  const user = await User.findById(req.auth._id).exec();
  const account = await stripe.accounts.retrieve(user.stripe_account_id);

  // console.log("STATUS==>", account);
  //update delay days
  const updatedAccount = await updateDelayDays(account.id);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      stripe_seller: updatedAccount,
    },
    { new: true }
  )
    .select("-password")
    .exec();

  // console.log("UPDATED USER==>", updatedUser);
  res.json(updatedUser);
};

export const getAccBalance = async (req, res) => {
  const user = await User.findById(req.auth._id).exec();

  try {
    let balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    });
    // console.log(balance);
    res.json(balance);
  } catch (err) {
    console.log(err);
  }
};

export const payoutSetting = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id).exec();
    const loginLink = await stripe.accounts.createLoginLink(
      user.stripe_account_id,
      {
        redirect_url: process.env.STRIPE_REDIRECT_URL,
      }
    );
    console.log("LOGIN LINK==>", loginLink);
    res.json(loginLink);
  } catch (err) {
    console.log("STRIPE PAYOUT SETTING ERROR==>", err);
  }
};
