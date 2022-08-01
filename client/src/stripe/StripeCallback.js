import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { getAccStatus } from "../actions/stripe";
import { updateUserInLocalStorage } from "../actions/auth";

const StripeCallback = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (auth && auth.token) accStatus();
  }, [auth]);

  const accStatus = async () => {
    try {
      let res = await getAccStatus(auth.token);
      //   console.log("ACCOUNT STATUS ON STRIPE CALLBACK ", res);

      //Update user in local storage
      updateUserInLocalStorage(res.data, () => {
        //update user in redux

        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });

        //redirecting user to dashboard
        window.location.href = "/dashboard/seller";
      });
    } catch (err) {
      console.log("STRIPE CALLBACK ACCOUNT STATUS ERROR ===> ", err);
    }
  };

  return (
    <div className="d-flex justify-content-center p-5">
      <LoadingOutlined className="display-1 p-5 text-danger" />
    </div>
  );
};

export default StripeCallback;
