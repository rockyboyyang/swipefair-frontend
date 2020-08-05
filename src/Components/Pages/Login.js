import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

const Login = (props) => {
  return (
    <div className="form-container">
      <form>
          <input type="text" placeholder="Enter Email"></input>
          <input type="password" placeholder="Enter Password"></input>
          <button>Log In</button>
      </form>
      <div>
          <p>Don't have an account? </p>
          <div>Sign Up</div>
      </div>
      <button>Demo</button>
    </div>
  )
}

export default Login;
