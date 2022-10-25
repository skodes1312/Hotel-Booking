import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { createConnectAccount } from "../actions/stripe";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { sellerHotels, deleteHotel } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";

const DashboardSeller = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    loadSellerHotels();
  }, []);

  const loadSellerHotels = async () => {
    let res = await sellerHotels(auth.token);
    setHotels(res.data);
  };

  const deleteHotelHandler = async (hotelId) => {
    if (!window.confirm("Do you really want to delete?")) return;
    deleteHotel(auth.token, hotelId).then((res) => {
      toast.success("Successfully deleted.");
      loadSellerHotels();
    });
  };

  const clickHandler = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      //Stripe onboarding
      window.location.href = res.data;
      // console.log(res);
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
                Happy Stay partners with Stripe to transfer the earnings into
                your account
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
        <div className="row">
          {hotels.map((h) => (
            <SmallCard
              key={h._id}
              h={h}
              owner={true}
              showViewMoreButton={false}
              deleteHandler={deleteHotelHandler}
            />
          ))}
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="container-fluid text-center bg-dark p-5">
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
