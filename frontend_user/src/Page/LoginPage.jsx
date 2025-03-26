import axios from "axios";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [passowrd, setPassowrd] = useState("");
  const { login, isLoading, error } = useLogin();

  async function handleClick(e) {
    e.preventDefault();
    await login(email, passowrd);
  }
  return (
    <div className="auth-page">
      <form onSubmit={handleClick}>
        <h2>Login</h2>
        <div>
          <label>Email : </label>
          <input
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>
        <div>
          <label>Password : </label>
          <input
            type="password"
            value={passowrd}
            onChange={(ev) => setPassowrd(ev.target.value)}
          />
        </div>
        <button className="btn">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default SignupPage;
