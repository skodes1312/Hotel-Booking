import axios from "axios";

export const register = async (userData) =>
  await axios.post(`${process.env.REACT_APP_API}/register`, userData);

export const login = async (userData) =>
  await axios.post(`${process.env.REACT_APP_API}/login`, userData);

//update user in local storage
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};

export const currencyFormatter = (data) => {
  return data.amount.toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};
