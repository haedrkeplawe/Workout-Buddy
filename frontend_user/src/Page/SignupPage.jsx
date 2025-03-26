import axios from "axios";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  async function handleClick(e) {
    e.preventDefault();
    await signup(name, email, password);
  }
  return (
    <div className="auth-page">
      <form onSubmit={handleClick}>
        <h2>Sign up</h2>
        <div>
          <label>Name : </label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>
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
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <button className="btn">Sign Up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default SignupPage;
