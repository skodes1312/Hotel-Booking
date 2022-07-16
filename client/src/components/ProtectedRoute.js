import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = (props) => {
  const { auth } = useSelector((state) => ({ ...state }));
  return auth && auth.token ? props.children : <Navigate to="/login" />;
};
export default ProtectedRoute;
