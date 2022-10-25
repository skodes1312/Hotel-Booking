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

export const sellerHotels = async (token) => {
  return await axios.get(`${process.env.REACT_APP_API}/seller-hotels`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteHotel = async (token, hotelId) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete-hotel/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const read = async (hotelID) =>
  await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelID}`);

export const updateHotel = async (token, data, hotelID) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/update-hotel/${hotelID}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
