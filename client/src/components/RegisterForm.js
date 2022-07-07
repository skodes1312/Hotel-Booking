const RegisterForm = ({
  submitHandler,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <form onSubmit={submitHandler} className="mt-3">
      <div className="form-group mb-3">
        <label className="form-label">Your name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label">Your email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Your password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default RegisterForm;
