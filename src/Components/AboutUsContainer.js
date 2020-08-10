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
          <a href="https://github.com/rockyboyyang/swipefair-frontend" target='_blank'>
            <img src="/assets/github.png" />
          </a>
        </div>
        <div className="about-us-bio">
          <p>
            Swipefair is an open-source react application powered by Heroku with a Flask backend. Our goal was to create a service that could help businesses and prospective employees connect in an easy and engaging way.
          </p>
        </div>
        <a className="about-profile" href="https://github.com/Arol15" target='_blank'>
          <div className="about-profile-pic" >
            <img src="/assets/lora.jpg" />
          </div>
          <h3>Lora Rusinouskaya</h3>
        </a>
        <a className="about-profile" href="https://github.com/lukenicholson" target='_blank'>
          <div className="about-profile-pic" >
            <img src="/assets/luke.png" />
          </div>
          <h3>Luke Nicholson</h3>
        </a>
        <a className="about-profile" href="https://github.com/rockyboyyang" target='_blank'>
          <div className="about-profile-pic">
            <img src="/assets/rocky.jpg" />
          </div>
          <h3>Rocky Yang</h3>
        </a>
        <a className="about-profile" href="https://github.com/sdkag" target='_blank'>
          <div className="about-profile-pic" >
            <img src="/assets/senyo.jpg" />
          </div>
          <h3>Senyo Agawu</h3>
        </a>
      </div>
  )
}

export default AboutUsContainer;

// https://github.com/Arol15
// https://github.com/lukenicholson
// https://github.com/rockyboyyang
// https://github.com/sdkag
