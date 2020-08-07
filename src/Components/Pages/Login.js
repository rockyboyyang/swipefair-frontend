import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
// import backendUrl from "../../utils";
// yeha modules are wack
const backendUrl = "http://localhost:5000/api";
const Login = ({ setToken, setJobseeker, setCompany }) => {
  // how do we get the methods?
  const [emailState, setEmail] = useState("");
  const [passwordState, setPassword] = useState("");

  const onclick = async (e) => {
    e.preventDefault(); //??? i think we said it would make no difference
    const body = {
      email: emailState,
      password: passwordState,
    };

    const res = await fetch(backendUrl + "/" + e.target.id + "/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const { access_token, jobseeker, company } = await res.json();
      setToken({ access_token });
      window.localStorage.access_token = access_token; //i swear i wrote this
      jobseeker ? setJobseeker({ jobseeker }) : setCompany({ company }); //check
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

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
      <button>Demo</button>
    </div>
  );
};

// so if we had made it a div we'd have been fine?
export default Login;
