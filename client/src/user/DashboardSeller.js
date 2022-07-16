import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { createConnectAccount } from "../actions/stripe";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
const DashboardSeller = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const clickHandler = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      //Stripe LOGIN
      console.log(res);
    } catch (err) {
      console.log("STRIPE SIGNUP ERROR", err);
      toast.error("Stripe connect failed, Try again");
      setLoading(false);
    }
  };

  const notConnected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="pointer p-5">
              <HomeOutlined className="h1" />
              <h4>Setup payouts to post hotel</h4>
              <p className="lead">
                MERN partners with Stripe to transfer the earnings into your
                account
              </p>
              <button
                disabled={loading}
                onClick={clickHandler}
                className="btn btn-primary mb-3"
              >
                {loading ? "Processing..." : "Setup Payouts"}
              </button>
              <p className="text-muted">
                <small>
                  You will be redirected to Stripe to complete the onboarding
                  process.
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const connected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">Your Hotels</div>
          <div className="col-md-2">
            <Link to="/hotels/new" className="btn btn-primary">
              + Add New
            </Link>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="container-fluid text-center bg-secondary p-5">
        <ConnectNav />
      </div>
      <div className="container-fluid p-4">
        <DashboardNav />
      </div>
      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}
    </>
  );
};
export default DashboardSeller;
