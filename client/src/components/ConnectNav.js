import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import { getAccBalance, payoutSetting } from "../actions/stripe";
import { currencyFormatter } from "../actions/auth";
import { SettingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
const { Meta } = Card;
const { Ribbon } = Badge;
const ConnectNav = () => {
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => ({ ...state }));
  const [balance, setBalance] = useState();
  useEffect(() => {
    getAccBalance(auth.token).then((res) => {
      // console.log(res);
      setBalance(res.data);
    });
  }, []);

  const payoutSettingHandler = async () => {
    setLoading(true);
    try {
      const res = await payoutSetting(auth.token);
      // console.log("RES LINK FOR PAYOUT SETTING ", res);
      window.location.href = res.data.url;
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Unable to acess settings.Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{auth.user.name[0]}</Avatar>}
          title={auth.user.name}
          description={`Joined ${moment(auth.user.createdAt).fromNow()} `}
        />
      </Card>
      {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled && (
          <>
            <Ribbon text="Available" color="green">
              <Card className="bg-info pt-1">
                {balance &&
                  balance.pending &&
                  balance.pending.map((bp, i) => (
                    <span key={i} className="lead">
                      {currencyFormatter(bp)}
                    </span>
                  ))}
              </Card>
            </Ribbon>
            <Ribbon text="Payouts" color="green">
              <Card onClick={payoutSettingHandler} className="bg-light pt-1">
                <SettingOutlined className="h5 pt-2" />
              </Card>
            </Ribbon>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
