import { Link } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
const Dashboard = () => {
  return (
    <>
      <div className="container-fluid text-center bg-secondary p-5">
        <ConnectNav />
      </div>
      <div className="container-fluid p-4">
        <DashboardNav />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">Your Booking</div>
          <div className="col-md-2">
            <Link to="/" className="btn btn-primary">
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
