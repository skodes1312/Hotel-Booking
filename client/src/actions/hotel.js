import axios from "axios";

export const createHotel = async (token, data) => {
  await axios.post(`${process.env.REACT_APP_API}/create-hotel`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const allHotels = async () =>
  await axios.get(`${process.env.REACT_APP_API}/hotels`);

export const diffdays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  const dif = Math.round(Math.abs(end - start) / day);
  return dif;
};