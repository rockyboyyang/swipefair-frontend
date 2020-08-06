import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../stylesheets/about-us.css"

const AboutUsContainer = (props) => {
  // const redirectToGithub = (user) => {
  //   // do something meaningful, Promises, if/else, whatever, and then
  //   window.location.assign(`http://github.com/${user}`);
  // }
  return (
      <div className="about-us-container">
        <div className="about-us-title">
          <h2>About Us</h2>
        </div>

        <p>
          Swipefair is an open-source react application powered by Heroku with a Flask backend. Our goal was to create a service that could help businesses and prospective employees connect in an easy and engaging way.
        </p>
        <a className="about-profile" href="https://github.com/Arol15" target='_blank'>
          <h3>Lora Rusinouskaya</h3>
          <div className="about-profile-pic" >
            <img src="/assets/lora.jpg" />
          </div>
        </a>
        <a className="about-profile" href="https://github.com/lukenicholson" target='_blank'>
          <h3>Luke Nicholson</h3>
          <div className="about-profile-pic" >
            <img src="/assets/luke.png" />
          </div>
        </a>
        <a className="about-profile" href="https://github.com/rockyboyyang" target='_blank'>
          <h3>Rocky Yang</h3>
          <div className="about-profile-pic">
            <img src="/assets/rocky.jpg" />
          </div>
        </a>
        <a className="about-profile" href="https://github.com/sdkag" target='_blank'>
          <h3>Senyo Agawu</h3>
          <div className="about-profile-pic" >
            <img src="/assets/senyo.jpg" />
          </div>
        </a>
      </div>
  )
}

export default AboutUsContainer;

// https://github.com/Arol15
// https://github.com/lukenicholson
// https://github.com/rockyboyyang
// https://github.com/sdkag
