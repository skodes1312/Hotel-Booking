import { useNavigate, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { diffdays } from "../../actions/hotel";
import { currencyFormatter } from "../../actions/auth";
const SmallCard = ({
  h,
  deleteHandler = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card mb-2">
        <div className="row no-gutters">
          <div className="col-md-4">
            {h.image && h.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`}
                alt="loading image..."
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/800x400?text=PREVIEW"
                alt="loading image..."
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              {" "}
              <h3 className="card-title">
                {h.title}
                {"     "}
                <span className="float-right text-primary">
                  {currencyFormatter({
                    amount: h.price,
                    currency: "inr",
                  })}
                </span>
                {"     "}
              </h3>
              <p className="alert alert-info h6">{h.location}</p>
              <div className="card-text">{`${h.content.substring(
                1,
                200
              )}....`}</div>
              <p className="card-text">
                <span className="float-right text-primary">
                  for {diffdays(h.from, h.to)}{" "}
                  {diffdays(h.from, h.to) < 2 ? "day" : "days"}
                </span>
              </p>
              <p className="card-text">No. of Bed(s) : {h.bed}</p>
              <p className="card-text">
                Available from {new Date(h.from).toLocaleDateString()}
              </p>
              <div className="d-flex justify-content-between h4">
                {showViewMoreButton && (
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/hotel/${h._id}`)}
                  >
                    Show more
                  </button>
                )}
                {owner && (
                  <>
                    <Link to={`/hotel/edit/${h._id}`}>
                      <EditOutlined className="text-warning" />
                    </Link>
                    <DeleteOutlined
                      onClick={() => deleteHandler(h._id)}
                      className="text-danger"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
