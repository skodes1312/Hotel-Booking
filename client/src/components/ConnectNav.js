import { useSelector } from "react-redux";
import { Card, Avatar } from "antd";
import moment from "moment";

const { Meta } = Card;
const ConnectNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
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
        auth.user.stripe_seller_charges_enabled && (
          <>
            <div>Pending Balance</div>
            <div>Payout Settings</div>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
