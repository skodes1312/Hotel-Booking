const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  submitHandler,
}) => {
  return (
    <form onSubmit={submitHandler} className="mt-3">
      <div className="form-group mb-3">
        <label className="from-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email...."
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter your password...."
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button className="btn btn-primary">Log In</button>
    </form>
  );
};

export default LoginForm;
