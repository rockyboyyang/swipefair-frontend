import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../../stylesheets/login.css";
import backendURL from "../../backendURL";
import Footer from "../Footer";

const Login = ({ setToken, setJobseeker, setCompany, tokenState }) => {
  let history = useHistory();
  const [emailState, setEmail] = useState("");
  const [passwordState, setPassword] = useState("");

  const onclick = async (e, demoJobseeker = false, demoCompany = false) => {
    e.preventDefault();
    let body;
    if (demoJobseeker) {
      body = {
        email: "demoJobseeker@gmail.com",
        password: "password",
      };
    } else if (demoCompany) {
      body = {
        email: "demoCompany@gmail.com",
        password: "password",
      };
    } else {
      body = {
        email: emailState,
        password: passwordState,
      };
    }

    const res = await fetch(backendURL + "api/" + e.target.id + "/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const { access_token, jobseeker, company } = await res.json();
      setToken({ access_token });
      window.localStorage.access_token = access_token; //i swear i wrote this
      window.localStorage.jobseeker = JSON.stringify(jobseeker); //i swear i wrote this
      window.localStorage.company = JSON.stringify(company); //i swear i wrote this
      jobseeker ? setJobseeker(jobseeker) : setCompany(company); //check
      history.push("/");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const signUp = (e) => {
    e.preventDefault();
    history.push("/signup");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const loginJobseeker = (event) => {
    event.preventDefault();
    onclick(event, true, false);
  };

  const loginCompany = (event) => {
    event.preventDefault();
    onclick(event, false, true);
  };

  // if tokenState history.push('/login')
  return (
    <div className="splash">
      {/* <div className="login"> */}
      <div className="welcome-text">
        <img id="logo" src="/assets/swipefair-logo-white.png" />
        <h1>Where connections are made</h1>
      </div>
      <div className="login-form-container">
        <form>
          <div>
            <input
              type="text"
              placeholder="Enter Email"
              value={emailState}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter Password"
              value={passwordState}
              onChange={handlePasswordChange}
            />
          </div>
          <button id="session_jobseeker" onClick={onclick}>
            Log In as Jobseeker
          </button>
          <button id="session_company" onClick={onclick}>
            Log In as Company
          </button>
          <div className="sign-up-ref">
            <p>Don't have an account? </p>
            <button onClick={signUp}>Sign Up</button>
          </div>
          <div>
            <button id="session_jobseeker" onClick={loginJobseeker}>
              Demo Jobseeker
            </button>
            <button id="session_company" onClick={loginCompany}>
              Demo Company
            </button>
          </div>
        </form>
      </div>
      <Footer />
      {/* </div> */}
    </div>
  );
};

// so if we had made it a div we'd have been fine?
export default Login;
