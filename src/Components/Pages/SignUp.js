import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

const SignUp = (props) => {
  return (
    <div>
      <div className="form-container">
        <form>
          <input type="text" placeholder="Enter Name"></input>
          <input type="password" placeholder="Enter Password"></input>
          <input type="confirm password" placeholder="Confirm Password"></input>
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container">
        <form>
          <input type="text" placeholder="Enter Company Name"></input>
          <input type="password" placeholder="Enter Password"></input>
          <input type="confirm password" placeholder="Confirm Password"></input>
          <button>Sign Up</button>
        </form>
      </div>

    </div>
  );
}

export default SignUp;
