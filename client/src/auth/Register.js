import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../actions/auth";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await register({
        name,
        email,
        password,
      });
      console.log("Registered User: ", res);
      toast.success("Registration Succesful. Please Login.");
      navigate("/login");
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };
  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Register</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <RegisterForm
              submitHandler={submitHandler}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
