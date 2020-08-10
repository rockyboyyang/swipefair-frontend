import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import "../../stylesheets/sign-up.css"

const SignUp = (props) => {
  const [nameState, setName] = useState(undefined);
  const [emailState, setEmail] = useState(undefined);
  const [passwordState, setPassword] = useState(undefined);
  const [confirmPasswordState, setConfirmPassword] = useState(undefined);
  const [companyNameState, setCompanyName] = useState(undefined);
  const [companyEmailState, setCompanyEmail] = useState(undefined);
  const [companyPasswordState, setCompanyPassword] = useState(undefined);
  const [companyConfirmPasswordState, setCompanyConfirmPassword] = useState(undefined);

  const backendUrl = "https://boiling-sands-04799.herokuapp.com/api";

  const jobseekerOnclick = async (e) => {
    e.preventDefault(); //??? i think we said it would make no difference
    if (passwordState !== confirmPasswordState) return;

    const body = {
      name: nameState,
      email: emailState,
      password: passwordState,
    };

    const res = await fetch(backendUrl + "/session_jobseeker/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // if (res.ok) {
    //   const { access_token, jobseeker, company } = await res.json();
    //   setToken({ access_token });
      // window.localStorage.access_token = access_token; //i swear i wrote this
    //   jobseeker ? setJobseeker({ jobseeker }) : setCompany({ company }); //check
    // }
  };

  const companyOnclick = async (e) => {
    e.preventDefault(); //??? i think we said it would make no difference
    if (companyPasswordState !== companyConfirmPasswordState) return;

    const body = {
      email: companyEmailState,
      company_name: companyNameState,
      password: companyPasswordState,
    };

    const res = await fetch(backendUrl + "/session_company/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // if (res.ok) {
    //   const { access_token, jobseeker, company } = await res.json();
    //   setToken({ access_token });
    //   window.localStorage.access_token = access_token; //i swear i wrote this
    //   jobseeker ? setJobseeker({ jobseeker }) : setCompany({ company }); //check
    // }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleCompanyEmailChange = (event) => {
    setCompanyEmail(event.target.value);
  };

  const handleCompanyPasswordChange = (event) => {
    setCompanyPassword(event.target.value);
  };

  const handleCompanyConfirmPasswordChange = (event) => {
    setCompanyConfirmPassword(event.target.value);
  };

  return (
    <div className="sign-up">
      <div className="sign-up-containers">
        <div className="form-container jobseeker-form">
          <form>
            <h1>Jobseeker Sign Up</h1>
            <input type="text" placeholder="Enter Name" value={nameState} onChange={handleNameChange}></input>
            <input type="email" placeholder="Enter Email" value={emailState} onChange={handleEmailChange}></input>
            <input type="password" placeholder="Enter Password" value={passwordState} onChange={handlePasswordChange}></input>
            <input type="password" placeholder="Confirm Password" value={confirmPasswordState} onChange={handleConfirmPasswordChange}></input>
            <button onClick={jobseekerOnclick}>Sign Up</button>
          </form>
        </div>
        <div className="form-container company-form">
          <form>
            <h1>Company Sign Up</h1>
            <input type="text" placeholder="Enter Company Name" value={companyNameState} onChange={handleCompanyNameChange}></input>
            <input type="email" placeholder="Enter Company Email" value={companyEmailState} onChange={handleCompanyEmailChange}></input>
            <input type="password" placeholder="Enter Password" value={companyPasswordState} onChange={handleCompanyPasswordChange}></input>
            <input type="password" placeholder="Confirm Password" value={companyConfirmPasswordState} onChange={handleCompanyConfirmPasswordChange}></input>
            <button onClick={companyOnclick}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
