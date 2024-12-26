import React, { useState } from "react";
import { useAuth } from "../Context/AuthContextProvider";
import  "./SignInForm.css";
import SignIn from "../../assets/SignIn.png";
import logo from "../../assets/logo.png";
import googleIcon from "../../assets/googleIcon.png";
import vissiblityHide from "../../assets/vissiblityHide.png";
import vissibleIcon from "../../assets/vissibleIcon.png";

const SignInForm:React.FC = () => {
  const { user, login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
  };

  if (user) {
    return (
      <div className="auth-container">
        <h2>Welcome, {user.username}!</h2>
        <button className="sign-in-btn" onClick={logout}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="sign-in-container">
      <div className="form-section">
        <div style={{ marginBottom: "2rem" }}>
          <img src={logo} alt="logo" />
        </div>
        <span className="heading">Welcome back</span>
        <p>You need to be signed in to access the project dashboard.</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email or username</label>
            <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your email or username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            </div>
          </div>
          <div>
            <label>Password</label>
            <div className="input-wrapper">
              <input
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password-visibility"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <img className="iconImg" src={vissibleIcon} alt="👁️" />
                ) : (
                  <img className="iconImg" src={vissiblityHide} alt="🙈" />
                )}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label>
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={() => setKeepSignedIn(!keepSignedIn)}
              />
              Keep me signed in
            </label>
            <a href="#">Forget Password?</a>
          </div>
          <div className="buttons">
            <button className="sign-in-btn" type="submit">
              Sign In
            </button>
            <button className="sign-with-google" type="button">
              <img className="iconImg" src={googleIcon} alt="googleIcon" />
              Sign in with Google
            </button>
          </div>
          <span>
            Haven’t joined yet? <a href="#">Sign in</a>
          </span>
        </form>
      </div>

      <div className="image-section">
        <img src={SignIn} alt="Sign In img" />
      </div>
    </div>
  );
};

export default SignInForm;
