import React, { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
// import backendUrl from "../../utils";
// yeha modules are wack
const backendUrl = "http://localhost:5000/api";
const Login = ({ setToken, setJobseeker, setCompany, tokenState ,}) => {
  let history = useHistory();
  const [emailState, setEmail] = useState("");
  const [passwordState, setPassword] = useState("");

  const onclick = async (e, demoUser = false) => {
    e.preventDefault();
    let body;
    if (demoUser) {
      body = {
        email: "demo@gmail.com",
        password: "password",
      };
    } else {
      body = {
        email: emailState,
        password: passwordState,
      };
    }

    const res = await fetch(backendUrl + "/" + e.target.id + "/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(res.ok)
    if (res.ok) {
      const { access_token, jobseeker, company } = await res.json();
      setToken({ access_token });
      window.localStorage.access_token = access_token; //i swear i wrote this
      window.localStorage.jobseeker = JSON.stringify(jobseeker); //i swear i wrote this
      window.localStorage.company = JSON.stringify(company); //i swear i wrote this
      jobseeker ? setJobseeker({ jobseeker }) : setCompany({ company }); //check
      history.push("/home");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const loginDemoUser = (event) => {
    event.preventDefault();
    console.log("loging in the demo user");
    onclick(event, true);
  };

  // if tokenState history.push('/login')
  return (
    <div className="form-container">
      <form>
        <input
          type="text"
          placeholder="Enter Email"
          value={emailState}
          onChange={handleEmailChange}
        ></input>
        <input
          type="password"
          placeholder="Enter Password"
          value={passwordState}
          onChange={handlePasswordChange}
        ></input>
        <button id="session_jobseeker" onClick={onclick}>
          Log In as Jobseeker
        </button>
        <button id="session_company" onClick={onclick}>
          Log In as Company
        </button>
      </form>
      <div>
        <p>Don't have an account? </p>
        <div>Sign Up</div>
      </div>
      <button id="session_jobseeker" onClick={loginDemoUser}>
        Demo
      </button>
    </div>
  );
};

// so if we had made it a div we'd have been fine?
export default Login;
