import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("SEND LOGIN DATA", { email, password });
    try {
      let res = await login({ email, password });
      if (res.data) {
        console.log(
          "SAVE USER IN REDUX AND LOCAL STORAGE AND THEN REDIRECT ===>"
        );
        // console.log(res.data);
        //save user and token to local storage
        window.localStorage.setItem("auth", JSON.stringify(res.data));
        //save user and token to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        toast.success("Login Successful.");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid h1 bg-secondary p-5 text-center">
        {" "}
        Login{" "}
      </div>
      ;
      <div className="container">
        <div className="row">
          <div className="col-mid-6 offset-md-3">
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              submitHandler={submitHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
